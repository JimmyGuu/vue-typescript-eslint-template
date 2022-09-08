export function getType<T = any>(val: T): string {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}

export function parseGetUrl(url: string, data: { [k: string]: any }): string {
  if (!data) return url;
  // check url has ?
  const parseUrl = () => {
    if (/\?/.test(url)) {
      // is end of ?
      if (/\?$/.test(url)) {
        return url;
      }
      return url + "&";
    }
    return url + "?";
  };

  url = parseUrl();

  if (getType(data) === "String") return url + data;
  let str = "";
  const values = Object.values(data);
  Object.keys(data).forEach((key, idx) => {
    let val = values[idx];
    if (val == null) val = "";
    str += `${key}=${"" + val}&`;
  });
  str = str.replace(/&$/, "");
  return url + str;
}

export function getUrlParams(key: string): string | null {
  const UrlParams = new URLSearchParams(window.location.search.split("?")[1]);
  return UrlParams.get(key);
}
