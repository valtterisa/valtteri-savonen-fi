export const prerender = false;

import type { APIRoute } from "astro";
import { listPosts } from "../lib/marble";
import { buildHomeMarkdown, markdownResponse } from "../lib/profile";
import { SITE_URL } from "../lib/site";

export const GET: APIRoute = async () => {
  const posts = await listPosts();
  return markdownResponse(buildHomeMarkdown(posts), {
    canonical: SITE_URL,
    noindex: true,
  });
};
