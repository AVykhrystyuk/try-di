import { Constructor } from './constructor';
import { SymbolToken } from './symbol-token';

export abstract class Resolver {
  public abstract resolve<T>(token: Constructor<T>): T;
  public abstract resolve<T>(token: SymbolToken): T;
}
