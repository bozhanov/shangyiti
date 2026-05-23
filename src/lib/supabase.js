import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oxsupftsigpaawlfqray.supabase.co";
const supabaseAnonKey =
  "sb_publishable_lAL8c-r9a1JLyWWgk3Q4Xw_38MfhRTM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
