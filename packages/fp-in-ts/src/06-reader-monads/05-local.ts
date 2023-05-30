import type { reader } from "fp-ts";

export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <A>(ma: reader.Reader<R1, A>) => reader.Reader<R2, A>;
