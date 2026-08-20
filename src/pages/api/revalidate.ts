export const prerender = false;

import type { APIRoute } from "astro";
import {
  isJsonObject,
  isString,
  type JsonObject,
  type JsonValue,
} from "../../lib/json";
import { verifySignature } from "../../lib/marble";

function siteOrigin(): string | null {
  const site = import.meta.env.SITE;
  if (typeof site === "string" && site.length > 0) {
    return site.replace(/\/$/, "");
  }
  return null;
}

function readSlug(payload: JsonValue | null): string | null {
  if (!isJsonObject(payload)) {
    return null;
  }

  const candidates: JsonValue[] = [
    payload.slug,
    isJsonObject(payload.data) ? payload.data.slug : null,
    isJsonObject(payload.post) ? payload.post.slug : null,
    isJsonObject(payload.entry) ? payload.entry.slug : null,
  ];

  for (const candidate of candidates) {
    if (isString(candidate) && candidate.length > 0) {
      return candidate;
    }
  }

  return null;
}

function pathsToRevalidate(slug: string | null): string[] {
  const paths = ["/", "/sitemap.xml", "/og/blog.png", "/api/posts"];
  if (slug) {
    paths.push(`/blog/${slug}`, `/og/blog/${slug}.png`);
  }
  return paths;
}

async function revalidatePath(
  origin: string,
  path: string,
  bypassToken: string,
): Promise<{ path: string; ok: boolean; status: number }> {
  const response = await fetch(new URL(path, origin), {
    method: "HEAD",
    headers: {
      "x-prerender-revalidate": bypassToken,
    },
  });

  return {
    path,
    ok: response.ok,
    status: response.status,
  };
}

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      Allow: "POST",
    },
  });
};

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

  const origin = siteOrigin();
  if (!origin) {
    return new Response(JSON.stringify({ error: "Site origin missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload: JsonValue | null = null;
  try {
    payload = JSON.parse(body) as JsonValue;
  } catch {
    payload = null;
  }

  const slug = readSlug(payload);
  const paths = pathsToRevalidate(slug);
  const results = await Promise.all(
    paths.map((path) => revalidatePath(origin, path, secret)),
  );

  const failed = results.filter((result) => !result.ok);
  if (failed.length > 0) {
    return new Response(
      JSON.stringify({
        error: "Revalidation failed",
        results,
      } satisfies JsonObject),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify({ ok: true, results }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
