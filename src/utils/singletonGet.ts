const syncMap = new WeakMap();

export function singletonGetSync(
  fn: Function,
  context: any = void 0,
  args: any[] = [],
) {
  if (!fn) return undefined;

  if (syncMap.has(fn)) {
    return syncMap.get(fn);
  }
  const result = fn.apply(context, args);
  syncMap.set(fn, result);
  return result;
}

export function singletonPromiseCurry(fn: (...args: any[]) => Promise<any>) {
  let _singleton: undefined | Promise<any>;
  return function singletonCurryFunction(...args: any[]) {
    if (!_singleton) {
      _singleton = fn(...args);
      _singleton.then(res => {
        _singleton = undefined;
        return res;
      });
    }
    return _singleton;
  };
}
