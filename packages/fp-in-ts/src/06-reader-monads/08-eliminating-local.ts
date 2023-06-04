import { random as _random, reader } from "fp-ts";
import { pipe } from "fp-ts/lib/function.js";

interface Random {
  next: () => number;
}

const chanceButLower: reader.Reader<{ random: Random }, number> = ({
  random,
}) => random.next() * random.next();

type Result = "WIN" | "LOSE";

interface SlotMachine {
  result: (chance: number) => Result;
}

const predict =
  (chance: number): reader.Reader<{ slotMachine: SlotMachine }, Result> =>
  ({ slotMachine }) =>
    slotMachine.result(chance);

interface Deps {
  random: Random;
  slotMachine: SlotMachine;
}

const tryMyLuck: reader.Reader<Deps, Result> = pipe(
  chanceButLower,
  reader.chainW(predict)
);

// Example usage
console.log({
  result: tryMyLuck({
    random: { next: _random.random },
    slotMachine: { result: (chance) => (chance >= 0.99 ? "WIN" : "LOSE") },
  }),
});
