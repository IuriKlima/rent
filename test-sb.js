fetch("https://cqnvzlcrdhqjqjwkuick.supabase.co/rest/v1/rss_products?select=*&limit=1", {
  headers: {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnZ6bGNyZGhxanFqd2t1aWNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc1NDE4OCwiZXhwIjoyMDg4MzMwMTg4fQ.4TnAv5FqfkiFGho9W53cFj6acm1L8xWwzbu6QUV0D1M",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnZ6bGNyZGhxanFqd2t1aWNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc1NDE4OCwiZXhwIjoyMDg4MzMwMTg4fQ.4TnAv5FqfkiFGho9W53cFj6acm1L8xWwzbu6QUV0D1M"
  }
}).then(r => r.json()).then(console.log).catch(console.error);
fetch("https://cqnvzlcrdhqjqjwkuick.supabase.co/rest/v1/rss_categories?select=*&limit=1", {
  headers: {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnZ6bGNyZGhxanFqd2t1aWNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc1NDE4OCwiZXhwIjoyMDg4MzMwMTg4fQ.4TnAv5FqfkiFGho9W53cFj6acm1L8xWwzbu6QUV0D1M",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnZ6bGNyZGhxanFqd2t1aWNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc1NDE4OCwiZXhwIjoyMDg4MzMwMTg4fQ.4TnAv5FqfkiFGho9W53cFj6acm1L8xWwzbu6QUV0D1M"
  }
}).then(r => r.json()).then(console.log).catch(console.error);
