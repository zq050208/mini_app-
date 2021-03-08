/* eslint-disable local-rules/no-navigation */
import Url from './url';
export enum NavigateTypes {
  'redirect' = 'redirect',
  'switch' = 'switch',
  'navigate' = 'navigate',
  'reLaunch' = 'reLaunch',
}

type GoOptions = {
  type?: NavigateTypes;
  params?: {
    [k in string]: string;
  };
};

type RouteValueObjcetType = {
  url: string;
  type: NavigateTypes;
};
export type RouteValueType = string | RouteValueObjcetType;

export type RouteType = Record<string, RouteValueType>;

export type RouterType<R> = {
  [K in keyof R]: (option?: GoOptions) => void;
} & {
  navigateBack: () => {};
};

export function typeGuard<T extends RouteType>(obj: T) {
  return obj;
}

export default function routerFactory<R extends RouteType>(
  route: R,
): RouterType<R> {
  const router: {
    [k: string]: (option?: GoOptions) => void;
  } = {
    async navigateBack() {
      try {
        await mpx.navigateBack();
      } catch (error) {
        router.toHome();
      }
    },
  };

  Object.keys(route).forEach(key => {
    const methodName = key;
    const _route = route[key];

    let url: string;
    let defaultType: NavigateTypes;

    if (typeof _route === 'string') {
      url = _route;
      defaultType = NavigateTypes.navigate;
    } else {
      url = _route.url;
      defaultType = _route.type || NavigateTypes.navigate;
    }

    router[methodName as string] = function(option = {}) {
      const type = option.type || defaultType;
      const params = option.params;
      if (params) {
        url = Url.addQuery(params, url);
      }
      switch (type) {
        case NavigateTypes.switch:
          mpx.switchTab({
            url,
          });
          break;
        case NavigateTypes.navigate:
          mpx.navigateTo({
            url,
          });
          break;
        case NavigateTypes.reLaunch:
          mpx.reLaunch({
            url,
          });
          break;
        case NavigateTypes.redirect:
          mpx.redirectTo({
            url,
          });
          break;
      }
    };
  });

  return router as any;
}
