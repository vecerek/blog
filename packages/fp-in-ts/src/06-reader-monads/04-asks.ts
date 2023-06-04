import { reader } from "fp-ts";

export declare const asks: <R, A>(f: (r: R) => A) => reader.Reader<R, A>;
