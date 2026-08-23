export const prerender = false;

import type { APIRoute } from "astro";
import { getPost } from "../../lib/marble";
import { buildPostMarkdown, markdownResponse } from "../../lib/profile";
import { absoluteUrl } from "../../lib/site";

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response("Not found", { status: 404 });
  }

  const post = await getPost(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return markdownResponse(buildPostMarkdown(post), {
    canonical: absoluteUrl(`/blog/${slug}`),
    noindex: true,
  });
};
