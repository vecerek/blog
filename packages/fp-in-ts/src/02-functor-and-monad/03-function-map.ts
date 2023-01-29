interface Fn<A> {
  (): A;
}

interface FnMap {
  <A, B>(fn: (a: A) => B): (a: Fn<A>) => Fn<B>;
}

const functionMap: FnMap = (fn) => (a) => {
  return () => fn(a());
};

// source of values `a` (Fn<number>)
const makeNumber = () => 42;

// mapping of `a` (number) to `b` (string)
const toString = (a: number): string => String(a);

// source of values `b` (Function<string>)
export const result = functionMap(toString)(makeNumber);
