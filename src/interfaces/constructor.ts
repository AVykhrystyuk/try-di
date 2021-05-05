export interface Constructor<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

export type Constructor1<T, TArg1> = new (arg1: TArg1) => T;

export type Constructor2<T, TArg1, TArg2> = new (arg1: TArg1, arg2: TArg2) => T;

export type Constructor3<T, TArg1, TArg2, TArg3> = new (arg1: TArg1, arg2: TArg2, arg3: TArg3) => T;
