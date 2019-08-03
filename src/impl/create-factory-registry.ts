import { FactoryRegistry, Token, FactoryFunction } from '../interfaces';

export function createModernFactoryRegistry(): FactoryRegistry {
  const factoryByToken = new Map<Token, FactoryFunction<Token>>();

  return {
    getTokens(): Token[] {
      return Array.from(factoryByToken.keys());
    },
    hasFactory(token: Token): boolean {
      return factoryByToken.has(token);
    },
    setFactory(token: Token, factory: FactoryFunction<Token>): void {
      factoryByToken.set(token, factory);
    },
    getFactory(token: Token): FactoryFunction<Token> | undefined {
      return factoryByToken.get(token);
    },
    forEach(callback: (factory: FactoryFunction<Token>, token: Token, registry: FactoryRegistry) => void): void {
      factoryByToken.forEach((factory, token) => {
        callback(factory, token, this);
      });
    },
  };
}

export function createLegacyFactoryRegistry(): FactoryRegistry {
  const factoryByToken = Object.create(null);

  return {
    getTokens(): Token[] {
      throw Error('not impl');
    },
    hasFactory(token: Token): boolean {
      throw Error('not impl');
    },
    setFactory(token: Token, factory: FactoryFunction<Token>): void {
      throw Error('not impl');
    },
    getFactory(token: Token): FactoryFunction<Token> | undefined {
      throw Error('not impl');
    },
    forEach(callback: (factory: FactoryFunction<Token>, token: Token, registry: FactoryRegistry) => void): void {
      throw Error('not impl');
    },
  };
}
