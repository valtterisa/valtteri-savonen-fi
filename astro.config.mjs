import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://valtterisavonen.fi",
  output: "static",
  integrations: [react()],
  adapter: vercel({
    isr: {
      expiration: 60 * 60 * 12,
      bypassToken: process.env.MARBLE_WEBHOOK_SECRET,
      exclude: [/^\/api\/.+/],
    },
  }),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "src"),
      },
    },
  },
});
