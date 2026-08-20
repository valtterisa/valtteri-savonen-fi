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
      expiration: false,
      bypassToken: process.env.MARBLE_WEBHOOK_SECRET,
      exclude: [/^\/api\/.+/],
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
