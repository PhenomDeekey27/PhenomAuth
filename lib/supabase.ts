import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log("Initializing Supabase client...");
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key exists:", !!supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection
supabase
  .from("users")
  .select("*")
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error("Supabase connection test failed:", error);
    } else {
      console.log("Supabase connection successful, test query returned:", data);
    }
  })
  .catch((err: any) => {
    console.error("Supabase connection test error:", err);
  });
