export function isDef(value: any): boolean {
  return value !== undefined && value !== null;
}

export function isObj(x: any): boolean {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function isNumber(value: string) {
  return /^\d+(\.\d+)?$/.test(value);
}

export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function freezeKeys<T>(target: T, ...keys: string[]): T {
  keys.forEach(key => {
    Object.defineProperty(target, key, {
      configurable: false,
    });
  });
  return target;
}

export function hasKeys(target: any, ...keys: string[]) {
  const targetKeys = Object.keys(target);
  return keys.every(key => {
    return targetKeys.includes(key);
  });
}
