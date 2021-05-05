import { Resolver } from './resolver';

export type ResolveFactoryFunction<T> = (resolver: Resolver) => T;
