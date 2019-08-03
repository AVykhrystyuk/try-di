import { Container, FactoryRegistry } from './interfaces';
import { ContainerImpl, createModernFactoryRegistry, createLegacyFactoryRegistry } from './impl';

function createFactoryRegistry(): FactoryRegistry {
  if (process.env.BUILD_TYPE !== 'es5') {
    return createModernFactoryRegistry();
  }

  if (process.env.BUILD_TYPE === 'es5') {
    return createLegacyFactoryRegistry();
  }

  throw new Error('FactoryRegistry mode could not be determined.');
}

export function createContainer(): Container {
  const factoryRegistry = createFactoryRegistry();
  return new ContainerImpl(factoryRegistry);
}

export * from './interfaces';
