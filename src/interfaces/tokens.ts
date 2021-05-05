import { Constructor } from './constructor';

export type SymbolToken = symbol | string;

export type ConstructorToken<T> = Constructor<T>;

export type Token<T> = ConstructorToken<T> | SymbolToken;
