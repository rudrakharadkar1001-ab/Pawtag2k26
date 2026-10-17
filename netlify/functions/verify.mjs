const PIN = process.env.APP_PIN || "leo@123";

export default async (req) => {
  let ok = false;
  try {
    const b = await req.json();
    ok = String(b.pin ?? "") === PIN;
  } catch {}
  return new Response(JSON.stringify({ ok }), {
    status: ok ? 200 : 401,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
};

export const config = { path: "/api/verify" };
