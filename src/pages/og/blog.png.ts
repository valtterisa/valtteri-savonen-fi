import type { APIRoute } from "astro";
import { createElement } from "react";
import { BlogIndexOgImage } from "../../components/og/BlogIndexOgImage";
import { ogImageHeaders, renderOgImage } from "../../lib/og/render";

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderOgImage(createElement(BlogIndexOgImage));

  return new Response(png, {
    headers: ogImageHeaders(604800),
  });
};
