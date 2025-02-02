import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://eqrjsbiynefknscgwmhn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxcmpzYml5bmVma25zY2d3bWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MjcwMTUsImV4cCI6MjA1MTQwMzAxNX0.zckk_eCFZREm2DtpoCAvYEv1jT9-0MvRa7Ir4PJp194";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
