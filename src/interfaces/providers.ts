import { Constructor1, Constructor2, Constructor3 } from './constructor';
import { Token } from './tokens';
import { ResolveFactoryFunction } from './resolve-factory-function';

export interface BaseProvider<T> {
  for: Token<T>;
  singleton?: boolean;
}

export interface ClassProvider1<T, TCtor extends Constructor1<T, TCtorArg1>, TCtorArg1> extends BaseProvider<T> {
  use: TCtor;
  inject?: [Token<TCtorArg1>];
}

export interface ClassProvider2<T, TCtor extends Constructor2<T, TCtorArg1, TCtorArg2>, TCtorArg1, TCtorArg2>
  extends BaseProvider<T> {
  use: TCtor;
  inject?: [Token<TCtorArg1>, Token<TCtorArg2>];
}

export interface ClassProvider3<
  T,
  TCtor extends Constructor3<T, TCtorArg1, TCtorArg2, TCtorArg3>,
  TCtorArg1,
  TCtorArg2,
  TCtorArg3
> extends BaseProvider<T> {
  use: TCtor;
  inject?: [Token<TCtorArg1>, Token<TCtorArg2>, Token<TCtorArg3>];
}

export interface ResolveProvider<T, TResult extends T> extends BaseProvider<T> {
  use: ResolveFactoryFunction<TResult>;
}

export interface ValueProvider<T, TResult extends T> extends BaseProvider<T> {
  use: TResult;
}
