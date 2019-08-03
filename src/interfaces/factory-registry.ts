import { FactoryFunction } from './factory-function';

export type Token = unknown;

export interface FactoryRegistry {
  getTokens(): Token[];
  hasFactory(token: Token): boolean;
  setFactory(token: Token, factory: FactoryFunction<Token>): void;
  getFactory(token: Token): FactoryFunction<Token> | undefined;

  forEach(callback: (factory: FactoryFunction<Token>, token: Token, registry: FactoryRegistry) => void): void;
}
