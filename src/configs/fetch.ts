export type TFetchCodeSuccess = 0;
export type TFetchCodeWarning = 1;
export type TFetchCodeError = 2;
export type TFetchCode =
  | TFetchCodeSuccess
  | TFetchCodeWarning
  | TFetchCodeError;
export interface IFetchCode {
  SUCCESS: TFetchCodeSuccess;
  WARNING: TFetchCodeWarning;
  ERROR: TFetchCodeError;
}

// 前端请求状态编码
export const FETCH_CODE: IFetchCode = {
  // 请求成功
  SUCCESS: 0,
  // 请求成功但是有警告
  WARNING: 1,
  // 请求失败
  ERROR: 2,
};

export type TApiCodeSuccess = 200;
export type TApiCodeInvalid = 401;
export interface IApiCode {
  SUCCESS: TApiCodeSuccess;
  INVALID: TApiCodeInvalid;
}

// 后端约定请求状态编码
export const API_CODE: IApiCode = {
  // 请求成功
  SUCCESS: 200,
  // 登录失效
  INVALID: 401,
};

export type TFetchMethod = "GET" | "POST";
export interface IFetchConf {
  TIMEOUT: number;
  METHOD: {
    GET: TFetchMethod;
    POST: TFetchMethod;
  };
}

// 前端请求配置
export const FETCH_CONF: IFetchConf = {
  // 请求超时
  TIMEOUT: 10000,
  // 请求类型
  METHOD: {
    GET: "GET",
    POST: "POST",
  },
};
