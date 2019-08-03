import { Resolver } from './resolver';

export type FactoryFunction<T> = (resolver: Resolver) => T;
