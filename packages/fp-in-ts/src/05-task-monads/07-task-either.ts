import type { either, task } from "fp-ts";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TaskEither<E, A> extends task.Task<either.Either<E, A>> {}
