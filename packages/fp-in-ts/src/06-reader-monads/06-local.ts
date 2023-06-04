import { random as _random, reader } from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function.js";

interface Random {
  next: () => number;
}

const chanceButLower: reader.Reader<Random, number> = ({ next }) =>
  next() * next();

type Result = "WIN" | "LOSE";

interface SlotMachine {
  result: (chance: number) => Result;
}

const predict =
  (chance: number): reader.Reader<SlotMachine, Result> =>
  ({ result }) =>
    result(chance);

interface Deps {
  random: Random;
  slotMachine: SlotMachine;
}

const tryMyLuck: reader.Reader<Deps, Result> = pipe(
  chanceButLower,
  reader.local((deps: Deps) => deps.random),
  reader.chain(
    flow(
      predict,
      reader.local((deps: Deps) => deps.slotMachine)
    )
  )
);

// Example usage
console.log({
  result: tryMyLuck({
    random: { next: _random.random },
    slotMachine: { result: (chance) => (chance >= 0.99 ? "WIN" : "LOSE") },
  }),
});
