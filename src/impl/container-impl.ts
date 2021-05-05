import {
  Container,
  Resolver,
  ResolveFactoryFunction,
  FactoryRegistry,
  DependencyInjectionError,
  Token,
  Constructor1,
  Constructor2,
  Constructor3,
  ClassProvider1,
  ClassProvider2,
  ClassProvider3,
  ResolveProvider,
  ValueProvider,
} from '../interfaces';

export class ContainerImpl extends Container {
  public useClass<T, TCtor extends Constructor1<T, TCtorArg1>, TCtorArg1>(
    provider: ClassProvider1<T, TCtor, TCtorArg1>
  ): this;

  public useClass<T, TCtor extends Constructor2<T, TCtorArg1, TCtorArg2>, TCtorArg1, TCtorArg2>(
    provider: ClassProvider2<T, TCtor, TCtorArg1, TCtorArg2>
  ): this;

  public useClass<T, TCtor extends Constructor3<T, TCtorArg1, TCtorArg2, TCtorArg3>, TCtorArg1, TCtorArg2, TCtorArg3>(
    provider: ClassProvider3<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3>
  ): this;

  public useClass(provider: any): this {
    return this;
  }

  public useFactory<T, TResult extends T>(provider: ResolveProvider<T, TResult>): this {
    return this;
  }

  public useValue<T, TResult extends T>(provider: ValueProvider<T, TResult>): this {
    return this;
  }

  public readonly resolver: Resolver = this;

  public constructor(private readonly factoryRegistry: FactoryRegistry) {
    super();
  }

  /** @deprecated */
  public register<T>(token: Token<T>, factory: ResolveFactoryFunction<T>): this {
    if (this.factoryRegistry.hasFactory(token)) {
      const displayToken = this.getTokenDisplayName(token);
      throw new DependencyInjectionError(`Factory is already registered for '${displayToken}'`);
    }

    this.factoryRegistry.setFactory(token, factory);
    return this;
  }

  public resolve<T>(token: Token<T>): T {
    const factory = this.factoryRegistry.getFactory(token);
    if (factory == null) {
      const displayToken = this.getTokenDisplayName(token);
      throw new DependencyInjectionError(`Unable to resolve '${displayToken}'`);
    }

    try {
      const obj = factory(this.resolver);
      return obj as T;
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
