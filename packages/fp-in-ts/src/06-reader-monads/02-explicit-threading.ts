import { pipe } from "fp-ts/lib/function.js";

interface Logger {
  debug: (msg: string) => void;
}

const logger: Logger = {
  debug: (msg) => console.debug(msg),
};

const addWithLogging =
  (a: number) =>
  ({ debug }: Logger) =>
  (b: number): number => {
    debug(`Adding ${b} to ${a}`);

    return a + b;
  };

const res = pipe(39, addWithLogging(1)(logger), addWithLogging(2)(logger));

console.log({ res });
