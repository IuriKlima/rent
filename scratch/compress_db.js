import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Simple .env parser since dotenv is not installed
function loadEnv() {
  const envPath = join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    }
  }
}
loadEnv();

async function compress() {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  console.log("Fetching products...");
  const { data, error } = await supabase.from('products').select('id, image');
  if (error) {
    console.error("Error fetching products:", error);
    return;
  }
  
  let totalSaved = 0;
  for (const p of data) {
    if (p.image && p.image.length > 200000) { // If larger than ~200KB base64
      console.log(`Processing product ${p.id}... Size: ${(p.image.length / 1024 / 1024).toFixed(2)} MB`);
      
      try {
        // base64 to buffer
        const base64Data = p.image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        
        // compress with sharp
        const compressedBuffer = await sharp(buffer)
          .resize(800, null, { withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toBuffer();
          
        const compressedBase64 = `data:image/jpeg;base64,${compressedBuffer.toString('base64')}`;
        
        console.log(`  -> Compressed to ${(compressedBase64.length / 1024).toFixed(2)} KB`);
        totalSaved += (p.image.length - compressedBase64.length);
        
        // Update DB
        const { error: updateError } = await supabase.from('products').update({ image: compressedBase64 }).eq('id', p.id);
        if (updateError) {
          console.error(`  -> Error updating ${p.id}:`, updateError);
        } else {
          console.log(`  -> Saved to DB.`);
        }
      } catch (err) {
        console.error(`  -> Failed to compress ${p.id}:`, err);
      }
    }
  }
  console.log(`Done! Saved a total of ${(totalSaved / 1024 / 1024).toFixed(2)} MB in the database.`);
}

compress();
