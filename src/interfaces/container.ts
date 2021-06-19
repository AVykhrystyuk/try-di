import {
  Constructor1,
  Constructor2,
  Constructor3,
  Constructor4,
  Constructor5,
  Constructor6,
  Constructor7,
} from './constructor';
import { Resolver } from './resolver';
import {
  ClassProvider1,
  ClassProvider2,
  ClassProvider3,
  ClassProvider4,
  ClassProvider5,
  ClassProvider6,
  ClassProvider7,
  ResolveProvider,
  ValueProvider,
} from './providers';
import { DependencyInjectionError } from './di-error';

export abstract class Container extends Resolver {
  public abstract useFactory<T, TResult extends T>(provider: ResolveProvider<T, TResult>): Container;
  public abstract useValue<T, TResult extends T>(provider: ValueProvider<T, TResult>): Container;

  public abstract useClass<T, TCtor extends Constructor1<T, TCtorArg1>, TCtorArg1>(
    provider: ClassProvider1<T, TCtor, TCtorArg1>
  ): Container;

  public abstract useClass<T, TCtor extends Constructor2<T, TCtorArg1, TCtorArg2>, TCtorArg1, TCtorArg2>(
    provider: ClassProvider2<T, TCtor, TCtorArg1, TCtorArg2>
  ): Container;

  public abstract useClass<
    T,
    TCtor extends Constructor3<T, TCtorArg1, TCtorArg2, TCtorArg3>,
    TCtorArg1,
    TCtorArg2,
    TCtorArg3
  >(provider: ClassProvider3<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3>): Container;

  public abstract useClass<
    T,
    TCtor extends Constructor4<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4>,
    TCtorArg1,
    TCtorArg2,
    TCtorArg3,
    TCtorArg4
  >(provider: ClassProvider4<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4>): Container;

  public abstract useClass<
    T,
    TCtor extends Constructor5<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5>,
    TCtorArg1,
    TCtorArg2,
    TCtorArg3,
    TCtorArg4,
    TCtorArg5
  >(provider: ClassProvider5<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5>): Container;

  public abstract useClass<
    T,
    TCtor extends Constructor6<T, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5, TCtorArg6>,
    TCtorArg1,
    TCtorArg2,
    TCtorArg3,
    TCtorArg4,
    TCtorArg5,
    TCtorArg6
  >(provider: ClassProvider6<T, TCtor, TCtorArg1, TCtorArg2, TCtorArg3, TCtorArg4, TCtorArg5, TCtorArg6>): Container;

  public abstract useClass<
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

  public abstract tryVerifyAll(): DependencyInjectionError | undefined;

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
