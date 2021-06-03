import {
  Container,
  ResolveFactoryFunction,
  FactoryRegistry,
  DependencyInjectionError,
  Token,
  Constructor,
  Constructor1,
  Constructor2,
  Constructor3,
  Constructor4,
  Constructor5,
  Constructor6,
  Constructor7,
  ClassProvider1,
  ClassProvider2,
  ClassProvider3,
  ClassProvider4,
  ClassProvider5,
  ClassProvider6,
  ClassProvider7,
  ResolveProvider,
  ValueProvider,
  ClassBaseProvider,
} from '../interfaces';
import { memoize } from './utils';

export class ContainerImpl extends Container {
  public useValue<T, TResult extends T>(provider: ValueProvider<T, TResult>): Container {
    this.register(provider.for, () => provider.use);
    return this;
  }

  public useFactory<T, TResult extends T>(provider: ResolveProvider<T, TResult>): Container {
    this.register(provider.for, provider.use, provider.singleton);
    return this;
  }

  public useClass<T, TCtor extends Constructor1<T, TCtorArg1>, TCtorArg1>(
    provider: ClassProvider1<T, TCtor, TCtorArg1>
  ): Container;

  public useClass<T, TCtor extends Constructor2<T, TCtorArg1, TCtorArg2>, TCtorArg1, TCtorArg2>(
    provider: ClassProvider2<T, TCtor, TCtorArg1, TCtorArg2>
  ): Container;

  public useClass<T, TCtor extends Constructor3<T, TCtorArg1, TCtorArg2, TCtorArg3>, TCtorArg1, TCtorArg2, TCtorArg3>(
    provider: ClassProvider3<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3>
  ): Container;

  public useClass<
    T,
    TCtor extends Constructor4<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4>,
    TCtorArg1,
    TCtorArg2,
    TCtorArg3,
    TCtorArg4
  >(provider: ClassProvider4<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4>): Container;

  public useClass<
    T,
    TCtor extends Constructor5<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5>,
    TCtorArg1,
    TCtorArg2,
    TCtorArg3,
    TCtorArg4,
    TCtorArg5
  >(provider: ClassProvider5<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5>): Container;

  public useClass<
    T,
    TCtor extends Constructor6<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5, TCtorArg6>,
    TCtorArg1,
    TCtorArg2,
    TCtorArg3,
    TCtorArg4,
    TCtorArg5,
    TCtorArg6
  >(provider: ClassProvider6<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5, TCtorArg6>): Container;

  public useClass<
    T,
    TCtor extends Constructor7<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5, TCtorArg6, TCtorArg7>,
    TCtorArg1,
    TCtorArg2,
    TCtorArg3,
    TCtorArg4,
    TCtorArg5,
    TCtorArg6,
    TCtorArg7
  >(
    provider: ClassProvider7<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5, TCtorArg6, TCtorArg7>
  ): Container;

  public useClass(provider: ClassBaseProvider<unknown, Constructor<unknown>>): Container {
    this.register(
      provider.for,
      () => {
        const Ctor = provider.use;
        const depTokens = provider.inject ?? [];
        const deps = depTokens.map((token) => this.resolve(token));
        return new Ctor(...deps);
      },
      provider.singleton
    );

    return this;
  }

  public constructor(private readonly factoryRegistry: FactoryRegistry) {
    super();
  }

  private register<T>(token: Token<T>, factory: ResolveFactoryFunction<T>, singleton?: boolean): this {
    const finalFactory = singleton ? memoize(factory) : factory;

    if (this.factoryRegistry.hasFactory(token)) {
      const displayToken = this.getTokenDisplayName(token);
      throw new DependencyInjectionError(`Factory is already registered for '${displayToken}'`);
    }

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

  public tryVerifyAll(): boolean {
    return true;
  }

  public verifyAll(): void {
    this.factoryRegistry.forEach((factory, token) => {
      console.log(token, factory);
    });
  }

  private getTokenDisplayName<T>(token: Token<T>): string {
    const displayToken = token instanceof Function ? token.name : token.toString();
    return displayToken;
  }
}
