/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly MARBLE_API_KEY?: string;
  readonly MARBLE_WEBHOOK_SECRET?: string;
  readonly SITE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
