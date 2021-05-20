import { FactoryRegistry } from '../interfaces';

export function createLegacyFactoryRegistry(): FactoryRegistry {
  const factoryByToken = Object.create(null);

  return {
    getTokens: () => {
      throw Error('not impl');
    },
    hasFactory: (token) => {
      throw Error('not impl');
    },
    getFactory: (token) => {
      throw Error('not impl');
    },
    setFactory(token, factory) {
      throw Error('not impl');
    },
    forEach(callback) {
      throw Error('not impl');
    },
  };
}
