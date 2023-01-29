export const map =
  <A, B>(fn: (a: A) => B) =>
  (x: A[]): B[] => {
    if (x.length === 0) return [];

    // pretend to be the rest of map's implementation
    return x.map(fn);
  };
