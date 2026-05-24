import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    "https://oxsupftsigpaawlfqray.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
      "sb_publishable_lAL8c-r9a1JLyWWgk3Q4Xw_38MfhRTM"
  );

  const { error } = await supabase
    .from("leaderboard")
    .delete()
    .eq("name", "LIU")
    .eq("score", 5000);

  const { data: check } = await supabase
    .from("leaderboard")
    .select("*")
    .eq("name", "LIU")
    .eq("score", 5000);

  return Response.json({
    deleted: !error,
    error: error?.message || null,
    stillExists: check?.length > 0,
  });
}
