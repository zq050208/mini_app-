import { createStore } from '@mpxjs/core';
import authStore from './auth.store';
import userPlatesStore from './plates.store';

/**
 * MPX Store 不支持namespace
 */
const store = createStore({
  modules: {
    auth: authStore,
    plates: userPlatesStore,
  },
});

export default store as typeof store & {
  state: typeof store.state & {
    auth: Exclude<typeof authStore.state, Function>;
  };
  mapState<M extends Record<string, Function>>(
    maps: M,
  ): {
    [I in keyof M]: () => M[I];
  };
};

let installed = false;

export function install(target: any, store: any) {
  if (installed) return;
  installed = true;
  target.$store = store;
  Object.defineProperty(target.prototype, '$store', {
    get() {
      return store;
    },
  });
}
