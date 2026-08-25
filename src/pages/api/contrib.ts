export const prerender = false;

import type { APIRoute } from "astro";
import { getContributionGraph } from "../../lib/contrib";

const cacheSeconds = 60 * 60 * 8;

export const GET: APIRoute = async () => {
  const graph = await getContributionGraph();

  return new Response(JSON.stringify(graph), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`,
    },
  });
};
