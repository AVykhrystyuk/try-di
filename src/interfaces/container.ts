import { ConstructorToken } from './constructor';
import { Resolver } from './resolver';
import { SymbolToken } from './symbol-token';
import { FactoryFunction } from './factory-function';

export abstract class Container extends Resolver {
  public abstract register<T>(token: ConstructorToken<T>, factory: FactoryFunction<T>): this;
  public abstract register<T>(token: SymbolToken, factory: FactoryFunction<T>): this;

  public abstract tryVerifyAll(): boolean;

  /**
   * Verifies that all registered tokens can be resolved
   * and throws `DependencyInjectionError` if there is any token that cannot be resolved
   *
   * @example
   * try {
   *   container.verifyAll();
   * }
   * catch (err) {
   *   if (err instanceof DependencyInjectionError) {
   *     // do something about it
   *   }
   * }
   *
   */
  public abstract verifyAll(): void;
}
