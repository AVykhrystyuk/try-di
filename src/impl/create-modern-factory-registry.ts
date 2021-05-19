import { FactoryRegistry, Token, ResolveFactoryFunction } from '../interfaces';

export function createModernFactoryRegistry(): FactoryRegistry {
  const factoryByToken = new Map<Token, ResolveFactoryFunction<unknown>>();

  return {
    getTokens: () => Array.from(factoryByToken.keys()),
    hasFactory: (token) => factoryByToken.has(token),
    getFactory: (token) => factoryByToken.get(token),
    setFactory(token, factory) {
      factoryByToken.set(token, factory);
    },
    forEach(callback) {
      factoryByToken.forEach((factory, token) => {
        callback(factory, token, this);
      });
    },
  };
}
