fetch("https://cqnvzlcrdhqjqjwkuick.supabase.co/rest/v1/rss_products?select=*&limit=1", {
  headers: {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnZ6bGNyZGhxanFqd2t1aWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTQxODgsImV4cCI6MjA4ODMzMDE4OH0.nZKTWFmoQyCw3PEDZOWXu2IU4nraV8BpIhu-ZEIWBok",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnZ6bGNyZGhxanFqd2t1aWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTQxODgsImV4cCI6MjA4ODMzMDE4OH0.nZKTWFmoQyCw3PEDZOWXu2IU4nraV8BpIhu-ZEIWBok"
  }
}).then(r => r.json()).then(console.log).catch(console.error);
