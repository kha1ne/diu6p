declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.mp3' {
  const src: string;
  export default src;
}
