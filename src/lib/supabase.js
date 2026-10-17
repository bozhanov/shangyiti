const SUPABASE_URL = "https://oxsupftsigpaawlfqray.supabase.co";
const SUPABASE_KEY = "sb_publishable_lAL8c-r9a1JLyWWgk3Q4Xw_38MfhRTM";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

export async function fetchTopScores(limit = 200) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/leaderboard?select=name,score&order=score.desc&limit=${limit}`,
    { headers, cache: "no-store" }
  );
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

export async function insertScore(name, score) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, score }),
  });
  if (!res.ok) throw new Error(String(res.status));
}
