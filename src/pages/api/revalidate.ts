export const prerender = false;

import type { APIRoute } from "astro";
import { verifySignature } from "../../lib/marble";

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get("x-marble-signature");
  const secret = import.meta.env.MARBLE_WEBHOOK_SECRET;

  if (!secret || !signature) {
    return new Response(
      JSON.stringify({ error: "Secret or signature missing" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const body = await request.text();
  const valid = await verifySignature(secret, signature, body);

  if (!valid) {
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: "true" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
