import { get, request } from "./03-partial-application.js";

// instead of
export const myGetRequest = request("GET")(new URL("http://google.com"));

// we can just do
export const myGetRequest2 = get(new URL("http://google.com"));
