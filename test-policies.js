import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cqnvzlcrdhqjqjwkuick.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnZ6bGNyZGhxanFqd2t1aWNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc1NDE4OCwiZXhwIjoyMDg4MzMwMTg4fQ.4TnAv5FqfkiFGho9W53cFj6acm1L8xWwzbu6QUV0D1M"; // service role
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.rpc('get_policies' /* or something */);
  // Actually, we can query pg_policies
  const { data: policies, error: err } = await supabase.from('pg_policies').select('*').in('tablename', ['products', 'categories', 'rss_products', 'rss_categories']);
  console.log("Policies:", policies, err);
}
check();
