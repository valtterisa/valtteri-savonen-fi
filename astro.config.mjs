import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://valtterisavonen.fi",
  output: "static",
  integrations: [react()],
  adapter: vercel({
    isr: {
      expiration: 3600,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
