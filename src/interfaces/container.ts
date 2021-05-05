import { Constructor1, Constructor2, Constructor3 } from './constructor';
import { Resolver } from './resolver';
import { ClassProvider1, ClassProvider2, ClassProvider3, ResolveProvider, ValueProvider } from './providers';

export abstract class Container extends Resolver {
  public abstract useClass<T, TCtor extends Constructor1<T, TCtorArg1>, TCtorArg1>(
    provider: ClassProvider1<T, TCtor, TCtorArg1>
  ): this;

  public abstract useClass<T, TCtor extends Constructor2<T, TCtorArg1, TCtorArg2>, TCtorArg1, TCtorArg2>(
    provider: ClassProvider2<T, TCtor, TCtorArg1, TCtorArg2>
  ): this;

  public abstract useClass<
    T,
    TCtor extends Constructor3<T, TCtorArg1, TCtorArg2, TCtorArg3>,
    TCtorArg1,
    TCtorArg2,
    TCtorArg3
  >(provider: ClassProvider3<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3>): this;

  public abstract useFactory<T, TResult extends T>(provider: ResolveProvider<T, TResult>): this;
  public abstract useValue<T, TResult extends T>(provider: ValueProvider<T, TResult>): this;

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
   *     // TODO: handle the error
   *   }
   * }
   *
   */
  public abstract verifyAll(): void;
}
