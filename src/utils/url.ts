import qs from 'qs';
import urlParse from 'url-parse';

export default {
  getQueryObject(href?: string) {
    if (href) {
      return urlParse(href, true).query;
    } else {
      const query = window.location.search.substring(1);
      return qs.parse(query);
    }
  },
  removeQuery(keys: Array<string>, href: string): string {
    const url = urlParse(href, true);
    const query = url.query;
    keys.map(key => {
      delete query[key];
    });

    return url.toString();
  },
  addQuery(
    params: Record<string, string | number | undefined>,
    href: string,
  ): string {
    const url = urlParse(href, true);
    const query = url.query;
    (Object.keys(params) as string[]).map(key => {
      const value = params[key];
      if (value) {
        query[key] = String(value);
      }
    });
    return url.toString();
  },
  replaceHash(href: string, hash: string) {
    const url = urlParse(href, true);
    url.set('hash', hash);
    return url.toString();
  },
  join(...paths: string[]) {
    return paths
      .map((path, index) => {
        if (!path) return;
        if (index !== 0 || !this.isAbsoluteUrl(path)) {
          if (path[0] === '/') {
            path = path.substring(1);
          }
        }
        const lastIndex = path.length - 1;
        if (path?.[lastIndex] === '/') {
          path = path.substr(0, lastIndex);
        }
        return path;
      })
      .join('/');
  },
  isAbsoluteUrl(url: string) {
    return /http(s)?/.test(url);
  },
  stringify(p: any) {
    return qs.stringify(p);
  },
};
