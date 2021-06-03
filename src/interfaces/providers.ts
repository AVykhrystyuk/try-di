import {
  Constructor,
  Constructor1,
  Constructor2,
  Constructor3,
  Constructor4,
  Constructor5,
  Constructor6,
  Constructor7,
} from './constructor';
import { Token } from './tokens';
import { ResolveFactoryFunction } from './resolve-factory-function';

export interface BaseProvider<T> {
  for: Token<T>;
}

export interface SingletonBaseProvider<T> extends BaseProvider<T> {
  singleton?: boolean;
}

export interface ValueProvider<T, TResult extends T> extends BaseProvider<T> {
  use: TResult;
}

export interface ResolveProvider<T, TResult extends T> extends SingletonBaseProvider<T> {
  use: ResolveFactoryFunction<TResult>;
}
export interface ClassBaseProvider<T, TCtor extends Constructor<T>> extends SingletonBaseProvider<T> {
  use: TCtor;
  inject?: Token<unknown>[];
}

export interface ClassProvider1<T, TCtor extends Constructor1<T, TCtorArg1>, TCtorArg1>
  extends ClassBaseProvider<T, TCtor> {
  inject?: [Token<TCtorArg1>];
}

export interface ClassProvider2<T, TCtor extends Constructor2<T, TCtorArg1, TCtorArg2>, TCtorArg1, TCtorArg2>
  extends ClassBaseProvider<T, TCtor> {
  inject?: [Token<TCtorArg1>, Token<TCtorArg2>];
}

export interface ClassProvider3<
  T,
  TCtor extends Constructor3<T, TCtorArg1, TCtorArg2, TCtorArg3>,
  TCtorArg1,
  TCtorArg2,
  TCtorArg3
> extends ClassBaseProvider<T, TCtor> {
  inject?: [Token<TCtorArg1>, Token<TCtorArg2>, Token<TCtorArg3>];
}

export interface ClassProvider4<
  T,
  TCtor extends Constructor4<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4>,
  TCtorArg1,
  TCtorArg2,
  TCtorArg3,
  TCtorArg4
> extends ClassBaseProvider<T, TCtor> {
  inject?: [Token<TCtorArg1>, Token<TCtorArg2>, Token<TCtorArg3>, Token<TCtorArg4>];
}

export interface ClassProvider5<
  T,
  TCtor extends Constructor5<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5>,
  TCtorArg1,
  TCtorArg2,
  TCtorArg3,
  TCtorArg4,
  TCtorArg5
> extends ClassBaseProvider<T, TCtor> {
  inject?: [Token<TCtorArg1>, Token<TCtorArg2>, Token<TCtorArg3>, Token<TCtorArg4>, Token<TCtorArg5>];
}

export interface ClassProvider6<
  T,
  TCtor extends Constructor6<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5, TCtorArg6>,
  TCtorArg1,
  TCtorArg2,
  TCtorArg3,
  TCtorArg4,
  TCtorArg5,
  TCtorArg6
> extends ClassBaseProvider<T, TCtor> {
  inject?: [Token<TCtorArg1>, Token<TCtorArg2>, Token<TCtorArg3>, Token<TCtorArg4>, Token<TCtorArg5>, Token<TCtorArg6>];
}

export interface ClassProvider7<
  T,
  TCtor extends Constructor7<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5, TCtorArg6, TCtorArg7>,
  TCtorArg1,
  TCtorArg2,
  TCtorArg3,
  TCtorArg4,
  TCtorArg5,
  TCtorArg6,
  TCtorArg7
> extends ClassBaseProvider<T, TCtor> {
  inject?: [
    Token<TCtorArg1>,
    Token<TCtorArg2>,
    Token<TCtorArg3>,
    Token<TCtorArg4>,
    Token<TCtorArg5>,
    Token<TCtorArg6>,
    Token<TCtorArg7>
  ];
}
