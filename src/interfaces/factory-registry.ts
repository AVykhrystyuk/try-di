import { ResolveFactoryFunction } from './resolve-factory-function';
import { Token as RegistrationToken } from './tokens';

type Token = RegistrationToken<unknown>;

export type FactoryRegistryTokenCallback = (
  factory: ResolveFactoryFunction<Token>,
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
