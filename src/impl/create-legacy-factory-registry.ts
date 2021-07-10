import { FactoryRegistry, ResolveFactoryFunction, Token } from '../interfaces';

export function createLegacyFactoryRegistry(): FactoryRegistry {
  // cannot use `string | symbol` type here, see https://github.com/Microsoft/TypeScript/issues/24587
  const factoryByToken: Record<string, ResolveFactoryFunction<unknown>> = Object.create(null);
  // cannot iterate through symbols as keys in ES5
  const keys: Token<unknown>[] = [];

  const toKey = (token: Token<unknown>) => token as unknown as string;

  return {
    getTokens: () => keys,
    hasFactory: (token) => Object.prototype.hasOwnProperty.call(factoryByToken, toKey(token)),
    getFactory: (token) => factoryByToken[toKey(token)],
    setFactory(token, factory) {
      if (!this.hasFactory(token)) {
        keys.push(token);
      }
      factoryByToken[toKey(token)] = factory;
    },
    forEach(callback) {
      keys.forEach((token) => {
        const factory = this.getFactory(token)!;
        callback(factory, token, this);
      });
    },
  };
}
