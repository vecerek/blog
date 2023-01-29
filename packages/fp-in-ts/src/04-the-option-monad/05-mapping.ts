interface LookupCount {
  (_: Record<string, number>): { count: number } | null;
}

const lookupCount: LookupCount = (r) => {
  if (r["total"]) {
    return { count: r["total"] };
  } else {
    return null;
  }
};

export const res = lookupCount({ total: 42 });
// Value of res is { count: 42 };

export const res2 = lookupCount({});
// Value of res2 is null
// Type of both res and res2 is { count: 42 } | null
