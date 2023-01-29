class SomeCustomError extends Error {}

try {
  // call something that may throw
} catch (err: unknown) {
  if (err instanceof SomeCustomError) {
    // handle some custom error
  } else if (err instanceof Error) {
    // handle a generic error
  } else {
    throw new Error(String(err));
  }
}
