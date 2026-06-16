/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MARBLE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
