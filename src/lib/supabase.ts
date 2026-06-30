import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://cqnvzlcrdhqjqjwkuick.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnZ6bGNyZGhxanFqd2t1aWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTQxODgsImV4cCI6MjA4ODMzMDE4OH0.nZKTWFmoQyCw3PEDZOWXu2IU4nraV8BpIhu-ZEIWBok";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
