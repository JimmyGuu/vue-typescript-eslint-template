import Cookies from "js-cookie";

export const AUTH: { [k: string]: any } = new Proxy(
  {
    TOKEN: "",
  },
  {
    get(target, key) {
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      Cookies.set(key as string, value, { expires: 7, path: "/" });
      return Reflect.set(target, key, value);
    },
  }
);

export function authInit() {
  Object.keys(AUTH).forEach((key) => {
    const value = Cookies.get(key);
    if (value !== undefined) {
      AUTH[key] = value;
    }
  });
}

export function clearAuth() {
  Object.keys(AUTH).forEach((key) => {
    AUTH[key] = "";
    Cookies.remove(key);
  });
}
