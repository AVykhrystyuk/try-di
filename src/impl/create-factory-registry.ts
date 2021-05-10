import {
  FactoryRegistry,
  Token as RegistrationToken,
  ResolveFactoryFunction,
  FactoryRegistryTokenCallback,
} from '../interfaces';

type Token = RegistrationToken<unknown>;

export function createModernFactoryRegistry(): FactoryRegistry {
  const factoryByToken = new Map<Token, ResolveFactoryFunction<Token>>();

  return {
    getTokens(): Token[] {
      return Array.from(factoryByToken.keys());
    },
    hasFactory(token: Token): boolean {
      return factoryByToken.has(token);
    },
    setFactory(token: Token, factory: ResolveFactoryFunction<Token>): void {
      factoryByToken.set(token, factory);
    },
    getFactory(token: Token): ResolveFactoryFunction<Token> | undefined {
      return factoryByToken.get(token);
    },
    forEach(callback: FactoryRegistryTokenCallback): void {
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
    setFactory(token: Token, factory: ResolveFactoryFunction<Token>): void {
      throw Error('not impl');
    },
    getFactory(token: Token): ResolveFactoryFunction<Token> | undefined {
      throw Error('not impl');
    },
    forEach(callback: FactoryRegistryTokenCallback): void {
      throw Error('not impl');
    },
  };
}
