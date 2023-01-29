const makeCount = (x: string, y: string) => (r: Record<string, number>) => {
  if (r[x] && r[y]) {
    // @ts-expect-error TS still thinks r[x] and r[y] may possibly be undefined
    return r[x] + r[y];
  }

  return null;
};

const countDogsAndCats = makeCount("dogs", "cats");

export const res = countDogsAndCats({ dogs: 21, cats: 21 });
// Value of res is { count: 42 }

export const res2 = countDogsAndCats({});
// Value of res2 is null
// Type of both res and res2 is { count: number } | null
