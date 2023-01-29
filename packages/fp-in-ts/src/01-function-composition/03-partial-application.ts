type Method = "GET" | "POST" | "PUT" | "DELETE";
type Headers = Record<string, string>;
type Body =
  | Blob
  | Buffer
  | URLSearchParams
  | FormData
  | string
  | null
  | undefined;
type Request = {
  method: Method;
  url: URL;
  headers: Headers;
  body: Body;
};

// a function of arity 2
export const request =
  (method: Method) =>
  (url: URL): Request => ({
    method,
    url: url,
    headers: {},
    body: undefined,
  });

// functions of arity 1
export const get = request("GET");
export const post = request("POST");
export const put = request("PUT");
export const del = request("DELETE");
