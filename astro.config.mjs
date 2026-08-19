import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://valtterisavonen.fi",
  output: "static",
  adapter: vercel({
    isr: {
      expiration: 3600,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
