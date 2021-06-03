export interface Constructor<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

export type Constructor1<T, TArg1> = new (arg1: TArg1) => T;

export type Constructor2<T, TArg1, TArg2> = new (arg1: TArg1, arg2: TArg2) => T;

export type Constructor3<T, TArg1, TArg2, TArg3> = new (arg1: TArg1, arg2: TArg2, arg3: TArg3) => T;

export type Constructor4<T, TArg1, TArg2, TArg3, TArg4> = new (arg1: TArg1, arg2: TArg2, arg3: TArg3, arg4: TArg4) => T;

export type Constructor5<T, TArg1, TArg2, TArg3, TArg4, TArg5> = new (
  arg1: TArg1,
  arg2: TArg2,
  arg3: TArg3,
  arg4: TArg4,
  arg5: TArg5
) => T;

export type Constructor6<T, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6> = new (
  arg1: TArg1,
  arg2: TArg2,
  arg3: TArg3,
  arg4: TArg4,
  arg5: TArg5,
  arg6: TArg6
) => T;

export type Constructor7<T, TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7> = new (
  arg1: TArg1,
  arg2: TArg2,
  arg3: TArg3,
  arg4: TArg4,
  arg5: TArg5,
  arg6: TArg6,
  arg7: TArg7
) => T;
