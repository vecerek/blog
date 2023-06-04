import { random as _random, reader } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

interface Random {
  next: () => number;
}

interface Env {
  random: Random;
}

const nextRandom: reader.Reader<Env, number> = ({ random }) => random.next();

export const chanceButLower: reader.Reader<Env, number> = pipe(
  reader.Do, // returns reader.Reader<unknown, {}>
  reader.bind("a", () => reader.asks(nextRandom)),
  reader.bind("b", () => reader.asks(nextRandom)),
  reader.map(({ a, b }) => a * b)
);

// Example usage
console.log({
  result: chanceButLower({ random: { next: _random.random } }),
});
