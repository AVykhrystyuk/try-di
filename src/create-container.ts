import { Container, FactoryRegistry } from './interfaces';
import { ContainerImpl, createLegacyFactoryRegistry, createModernFactoryRegistry } from './impl';

function createFactoryRegistry(): FactoryRegistry {
  if (process.env.BUILD_TYPE !== 'es5') {
    return createModernFactoryRegistry();
  }

  if (process.env.BUILD_TYPE === 'es5') {
    return createLegacyFactoryRegistry();
  }

  /*
  at build time `process.env.BUILD_TYPE` will be replaced (by `@rollup/plugin-replace`) to something like:
  ```
    if ('cjs' !== 'es5') {
  ```
  and later terser (compressor) will keep only reachable code, removing other branches from the codebase
  that helps to reduce the bundle size shipsping only needed/supported code
  */

  throw new Error('FactoryRegistry mode could not be determined.');
}

export const createContainer = (): Container => new ContainerImpl(createFactoryRegistry());
