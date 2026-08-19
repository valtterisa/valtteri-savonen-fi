export const prerender = false;

import type { APIRoute } from "astro";
import { createElement } from "react";
import { BlogPostOgImage } from "../../../components/og/BlogPostOgImage";
import { formatPublished, getAuthor, getPost } from "../../../lib/marble";
import { ogImageHeaders, renderOgImage } from "../../../lib/og/render";

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response("Not found", { status: 404 });
  }

  const post = await getPost(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const author = getAuthor(post);
  const description =
    post.description ||
    "Read the latest post on Valtteri Savonen's blog.";

  const png = await renderOgImage(
    createElement(BlogPostOgImage, {
      title: post.title,
      description,
      authorName: author.name,
      publishedDisplay: post.publishedAt
        ? formatPublished(post.publishedAt)
        : undefined,
    }),
  );

  return new Response(png, {
    headers: ogImageHeaders(86400),
  });
};
