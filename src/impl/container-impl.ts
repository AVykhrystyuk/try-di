import {
  Constructor,
  ConstructorToken,
  Container,
  Resolver,
  FactoryFunction,
  SymbolToken,
  FactoryRegistry,
  DependencyInjectionError,
} from '../interfaces';

export class ContainerImpl extends Container {
  public readonly resolver: Resolver = this;

  public constructor(private readonly factoryRegistry: FactoryRegistry) {
    super();
  }

  public register<T>(token: ConstructorToken<T>, factory: FactoryFunction<T>): this;
  public register<T>(token: SymbolToken, factory: FactoryFunction<T>): this;
  public register<T>(token: Constructor<T> | SymbolToken, factory: FactoryFunction<T>): this {
    if (this.factoryRegistry.hasFactory(token)) {
      const displayToken = this.getTokenDisplayName(token);
      throw new DependencyInjectionError(`Factory is already registered for '${displayToken}'`);
    }

    this.factoryRegistry.setFactory(token, factory);
    return this;
  }

  public resolve<T>(token: Constructor<T>): T;
  public resolve<T>(token: SymbolToken): T;
  public resolve<T>(token: Constructor<T> | SymbolToken): T {
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

  private getTokenDisplayName<T>(token: Constructor<T> | SymbolToken): string {
    const displayToken = token instanceof Function ? token.name : token.toString();
    return displayToken;
  }
}
