# valtterisavonen.fi

Personal site — templates + Tailwind at the root, Go server under `backend/`.

## Run

```sh
pnpm install
pnpm start
```

Opens [http://localhost:8080](http://localhost:8080).

Optional env for blog:

```sh
export MARBLE_API_KEY=...
export MARBLE_WEBHOOK_SECRET=...
```

## Layout

```
templates/              # HTML + HTMX (UI)
css/                    # Tailwind v4
static/                 # images, favicons, og
backend/
  cmd/server/           # entrypoint
  internal/
    content/            # projects + experience
    marble/             # CMS client
    site/               # HTTP handlers
scripts/                # local start script
package.json go.mod Dockerfile railway.toml
```

## Deploy (Railway)

1. Connect this repo on [Railway](https://railway.app)
2. Builds via `Dockerfile`
3. Set `MARBLE_API_KEY` and `MARBLE_WEBHOOK_SECRET`
4. Point `valtterisavonen.fi` at the service
