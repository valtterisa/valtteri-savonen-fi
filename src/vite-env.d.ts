/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  readonly MARBLE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
