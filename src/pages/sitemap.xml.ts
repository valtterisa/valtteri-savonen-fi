export const prerender = false;

import type { APIRoute } from "astro";
import { listPosts } from "../lib/marble";
import { absoluteUrl, SITE_URL } from "../lib/site";

export const GET: APIRoute = async () => {
  const posts = await listPosts();
  const lastmod = new Date().toISOString();

  const urls = [
    { loc: SITE_URL, lastmod },
    { loc: absoluteUrl("/?tab=projects"), lastmod },
    { loc: absoluteUrl("/?tab=experience"), lastmod },
    { loc: absoluteUrl("/?tab=blog"), lastmod },
    ...posts.map((post) => ({
      loc: absoluteUrl(`/blog/${post.slug}`),
      lastmod: post.updatedAt || post.publishedAt || lastmod,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
