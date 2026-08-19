# valtterisavonen.fi

Personal site built with Astro 7, Tailwind CSS v4, and server-rendered blog + GitHub contribution data.

## Run locally

```sh
pnpm install
pnpm dev
```

Opens [http://localhost:4321](http://localhost:4321).

Optional env for blog:

```sh
export MARBLE_API_KEY=...
export MARBLE_WEBHOOK_SECRET=...
```

## Layout

```
src/
  components/           # UI components
  layouts/              # page layouts
  lib/                  # content, marble CMS, contributions
  pages/                # routes + API endpoints
  styles/               # Tailwind CSS
public/                 # static assets
astro.config.mjs
package.json
```

## Deploy (Vercel)

Connect this repo in the Vercel dashboard. Astro is detected automatically.

Set project env:

- `MARBLE_API_KEY`
- `MARBLE_WEBHOOK_SECRET`

The site uses on-demand rendering for the homepage (contribution graph + blog tab), blog posts, and the Marble revalidate webhook. Static assets are served from `public/`.

```sh
vercel deploy
```
