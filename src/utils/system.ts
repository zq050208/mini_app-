import { singletonGetSync } from './singletonGet';

export function getMenuButtonBoundingClientRect() {
  return singletonGetSync(mpx.getMenuButtonBoundingClientRect, mpx);
}

export function canIUse(method: string) {
  return singletonGetSync(mpx.canIUse, mpx, [method]);
}

export function getSystemInfo() {
  return singletonGetSync(mpx.getSystemInfoSync, mpx);
}
