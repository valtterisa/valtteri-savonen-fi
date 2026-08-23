export const prerender = false;

import type { APIRoute } from "astro";
import { listPosts } from "../lib/marble";
import { buildLlmsTxt, markdownResponse } from "../lib/profile";

export const GET: APIRoute = async () => {
  const posts = await listPosts();
  return markdownResponse(buildLlmsTxt(posts));
};
