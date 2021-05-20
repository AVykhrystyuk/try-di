import { ResolveFactoryFunction } from './resolve-factory-function';
import { Token } from './tokens';

export type FactoryRegistryTokenCallback = (
  factory: ResolveFactoryFunction<unknown>,
  token: Token,
  registry: FactoryRegistry
) => void;

export interface FactoryRegistry {
  getTokens(): Token[];
  hasFactory(token: Token): boolean;
  setFactory(token: Token, factory: ResolveFactoryFunction<unknown>): void;
  getFactory(token: Token): ResolveFactoryFunction<unknown> | undefined;

  forEach(callback: FactoryRegistryTokenCallback): void;
}
