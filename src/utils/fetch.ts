import { parseGetUrl } from "@/utils/tools";
import {
  API_CODE,
  AUTH,
  clearAuth,
  FETCH_CODE,
  FETCH_CONF,
  TFetchCode,
  TFetchMethod,
} from "@/configs";

export function request<T = any, U = any>(
  options: IRequestOptions<T>
): Promise<IRequestResponse<U>> {
  const merged = {
    params: {},
    method: FETCH_CONF.METHOD.POST,
    timeout: FETCH_CONF.TIMEOUT,
    ...options,
  };
  const { url, params, method, timeout } = merged;
  const response: IRequestResponse<U> = {
    code: FETCH_CODE.SUCCESS,
    msg: "succeed",
  };
  const controller = new AbortController();
  const signal = controller.signal;

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  return new Promise((resolve) => {
    if (!url) {
      response.code = FETCH_CODE.ERROR;
      response.msg = "url is required";
      resolve(response);
      console.error("url is required");
      return;
    }

    let requestUrl = url.replace(/^\//, "");
    const requestMethod = method.toUpperCase();
    if (requestMethod === FETCH_CONF.METHOD.GET) {
      const getParams = { v: +new Date(), ...params };
      requestUrl = parseGetUrl(requestUrl, {
        ...getParams,
      });
    }
    let requestBody = undefined;
    if (requestMethod === FETCH_CONF.METHOD.POST) {
      requestBody = JSON.stringify(params);
    }

    fetch(`/api/${requestUrl}`, {
      signal,
      headers: {
        "Content-Type": "application/json; utf-8",
        Authorization: AUTH.TOKEN,
      },
      mode: "cors",
      credentials: "include",
      method: requestMethod,
      body: requestBody,
    })
      .then((res) => {
        if (res.status !== 200) {
          return { code: res.status, message: res.statusText };
        }
        return res.json();
      })
      .then((res) => {
        if (res.code === API_CODE.SUCCESS) {
          response.data = res.data;
          resolve(response);
          return;
        }
        response.code = FETCH_CODE.ERROR;
        response.msg = res.message;
        resolve(response);
        // 登录失效 清除本地token并重新登录
        if (res.code === API_CODE.INVALID) {
          clearAuth();
        }
      })
      .catch((err) => {
        response.code = FETCH_CODE.ERROR;
        response.msg = err.message;
        resolve(response);
      })
      .finally(() => {
        clearTimeout(timer);
      });
  });
}

export interface IRequestResponse<T = any> {
  code: TFetchCode;
  msg: string;
  data?: T;
}

export interface IRequestOptions<T = any> {
  url: string;
  params?: T;
  method?: TFetchMethod;
  timeout?: number;
}
