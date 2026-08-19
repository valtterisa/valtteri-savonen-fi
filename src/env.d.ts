/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly MARBLE_API_KEY?: string;
  readonly MARBLE_WEBHOOK_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
