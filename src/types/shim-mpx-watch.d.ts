declare module '@mpxjs/core/src/observer/watch' {
  import { watch as watchVM } from '@mpxjs/core';
  export function watch(...args: Parameters<typeof watchVM>): () => void;
}
