/* eslint-disable @typescript-eslint/no-explicit-any */

type FunctionLike = (...args: any) => any;

type CacheHolder = { cache: Map<any, any> };

export const memoize = <T extends FunctionLike>(func: T, resolver?: FunctionLike): T & CacheHolder => {
  if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
    throw new TypeError('Expected a function');
  }

  const memoized = (...args: any[]) => {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const { cache } = memoized;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
  memoized.cache = new Map();
  return memoized as T & CacheHolder;
};
