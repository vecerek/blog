import { task } from "fp-ts";
import assert from "node:assert";

const myTask = task.of(42);

(async () => {
  const value = await myTask();
  assert.equal(value, 42);
  // OK, 42 == 42
})();
