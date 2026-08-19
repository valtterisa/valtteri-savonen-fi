import type { APIRoute } from "astro";
import { createElement } from "react";
import { HomeOgImage } from "../../components/og/HomeOgImage";
import { ogImageHeaders, renderOgImage } from "../../lib/og/render";

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderOgImage(createElement(HomeOgImage));

  return new Response(png, {
    headers: ogImageHeaders(604800),
  });
};
