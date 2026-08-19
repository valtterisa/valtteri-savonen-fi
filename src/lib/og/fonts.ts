type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600 | 700;
  style: "normal";
};

const FONT_URLS = {
  regular:
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-400-normal.woff",
  semibold:
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-600-normal.woff",
  bold:
    "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-700-normal.woff",
} as const;

let cachedFonts: OgFont[] | null = null;

async function loadFont(
  url: string,
  weight: OgFont["weight"],
): Promise<OgFont> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load font: ${url}`);
  }

  return {
    name: "Inter",
    data: await response.arrayBuffer(),
    weight,
    style: "normal",
  };
}

export async function getOgFonts(): Promise<OgFont[]> {
  if (cachedFonts) {
    return cachedFonts;
  }

  cachedFonts = await Promise.all([
    loadFont(FONT_URLS.regular, 400),
    loadFont(FONT_URLS.semibold, 600),
    loadFont(FONT_URLS.bold, 700),
  ]);

  return cachedFonts;
}
