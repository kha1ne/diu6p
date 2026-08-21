/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.mp3' {
  const src: string;
  export default src;
}
