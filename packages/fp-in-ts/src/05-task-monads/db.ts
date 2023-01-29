interface Db {
  query: (sql: string) => Promise<unknown>;
}

export interface QueryError {
  _tag: "QueryError";
}

export declare const db: Db;
