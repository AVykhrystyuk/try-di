import {
  Container,
  ResolveFactoryFunction,
  FactoryRegistry,
  DependencyInjectionError,
  Token,
  Constructor,
  ResolveProvider,
  ValueProvider,
  ClassBaseProvider,
} from '../interfaces';
import { memoize } from './utils';

const nameof = <T>(name: Extract<keyof T, string>): string => name;

const functionsToBind = [
  nameof<Container>('useValue'),
  nameof<Container>('useFactory'),
  nameof<Container>('useClass'),
  nameof<Container>('resolve'),
  nameof<Container>('tryVerifyAll'),
  nameof<Container>('verifyAll'),
];

export class ContainerImpl extends Container {
  public useValue<T, TResult extends T>(provider: ValueProvider<T, TResult>): Container {
    return this.register(provider.for, () => provider.use);
  }

  public useFactory<T, TResult extends T>(provider: ResolveProvider<T, TResult>): Container {
    return this.register(provider.for, provider.use, provider.singleton);
  }

  public useClass(provider: ClassBaseProvider<unknown, Constructor<unknown>>): Container {
    return this.register(
      provider.for,
      () => {
        const Ctor = provider.use;
        const depTokens = provider.inject || [];
        const deps = depTokens.map(this.resolve, this);
        return new Ctor(...deps);
      },
      provider.singleton
    );
  }

  public constructor(private readonly factoryRegistry: FactoryRegistry) {
    super();

    functionsToBind.forEach((func) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyThis = this as any;
      anyThis[func] = anyThis[func].bind(this);
    });
  }

  private register<T>(token: Token<T>, factory: ResolveFactoryFunction<T>, singleton?: boolean): this {
    if (this.factoryRegistry.hasFactory(token)) {
      const displayToken = this.getTokenDisplayName(token);
      throw new DependencyInjectionError(`Factory is already registered for '${displayToken}'`);
    }

    const finalFactory = singleton ? memoize(factory) : factory;
    this.factoryRegistry.setFactory(token, finalFactory);
    return this;
  }

  public resolve<T>(token: Token<T>): T {
    const factory = this.factoryRegistry.getFactory(token);
    if (factory == null) {
      const displayToken = this.getTokenDisplayName(token);
      throw new DependencyInjectionError(`Unable to resolve '${displayToken}'`);
    }

    try {
      return factory(this) as T;
    } catch (err) {
      const innerError = err instanceof Error ? err : undefined;
      const displayToken = this.getTokenDisplayName(token);
      throw new DependencyInjectionError(`Error resolving '${displayToken}'`, innerError);
    }
  }

  public tryVerifyAll(): DependencyInjectionError | undefined {
    try {
      this.verifyAll();
      return undefined;
    } catch (err) {
      if (err instanceof DependencyInjectionError) {
        return err;
      }
      throw err;
    }
  }

  public verifyAll(): void {
    this.factoryRegistry.forEach((factory, token) => {
      this.resolve(token);
    });
  }

  private getTokenDisplayName<T>(token: Token<T>): string {
    const displayToken = token instanceof Function ? token.name : token.toString();
    return displayToken;
  }
}
