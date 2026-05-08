import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the TanStack Start handler
import handler from './dist/server/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static assets from dist/client
app.use(express.static(path.join(__dirname, 'dist/client')));

// Handle all other requests with TanStack Start
app.use(async (req, res, next) => {
  try {
    const protocol = req.protocol || 'http';
    const host = req.get('host') || `localhost:${port}`;
    const url = new URL(req.originalUrl || req.url, `${protocol}://${host}`);

    const headers = new Headers();
    for (const key in req.headers) {
      if (req.headers[key]) {
        headers.append(key, req.headers[key]);
      }
    }

    const init = {
      method: req.method,
      headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      // In a real scenario we'd pipe the body properly or pass the stream, 
      // but for this standard TanStack setup we just pass it
      // if it's multipart/form-data or json we need to buffer or stream
      // Let's attach the req stream directly for fetch API compatibility
      init.body = req;
      init.duplex = 'half';
    }

    const request = new Request(url, init);

    // Call the TanStack Start handler
    const response = await handler.fetch(request);

    // Send back the response
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      // Stream the response
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send(`
      <h1>Internal Server Error</h1>
      <pre>${error.stack || error.message || String(error)}</pre>
    `);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
