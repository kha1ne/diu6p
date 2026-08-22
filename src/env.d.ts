/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_LOG_LEVEL: string;
  readonly VITE_LOG_TIMESTAMP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
