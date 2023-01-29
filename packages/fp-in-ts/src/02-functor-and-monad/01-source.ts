// the values are accessed by iteration
export type ArraySource = Array<string>;

// the value is accessed through property `a`
export interface RecordSource {
  a: string;
}

// the value is accessed through a function call
export interface FunctionSource {
  (): string;
}
