export const prerender = false;

import type { APIRoute } from "astro";
import { formatPublished, listPosts } from "../../lib/marble";

export const GET: APIRoute = async () => {
  const posts = await listPosts();
  const items = posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    publishedDisplay: formatPublished(post.publishedAt),
    tags: post.tags.map((tag) => tag.name || tag.slug),
  }));

  return new Response(JSON.stringify({ posts: items }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
};
