import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import type { ReactElement } from "react";
import { getOgFonts } from "./fonts";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export async function renderOgImage(element: ReactElement): Promise<ArrayBuffer> {
  const fonts = await getOgFonts();
  const svg = await satori(element, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: OG_WIDTH,
    },
  });

  const png = resvg.render().asPng();
  return png.buffer.slice(png.byteOffset, png.byteOffset + png.byteLength);
}

export function ogImageHeaders(maxAge = 86400): HeadersInit {
  return {
    "Content-Type": "image/png",
    "Cache-Control": `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=604800`,
  };
}
