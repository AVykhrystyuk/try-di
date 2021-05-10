import { Token } from './tokens';

export abstract class Resolver {
  public abstract resolve<T>(token: Token<T>): T;
}
