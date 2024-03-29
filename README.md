# try-di

[![Build Status](https://travis-ci.com/AVykhrystyuk/try-di.svg?branch=master)](https://travis-ci.com/AVykhrystyuk/try-di)
[![Coverage Status](https://coveralls.io/repos/github/AVykhrystyuk/try-di/badge.svg)](https://coveralls.io/github/AVykhrystyuk/try-di)

Try DI is a simple, typesafe and lightweight [dependency injection] container for TypeScript. Designed with the idea to avoid having runtime errors due to missing, incorrect or outdated mapping configuration.

- **Safe.** It type-checks every mapping. Allows to verify all the mappings in auto-tests (= on CI).
- **Fast.** `TODO: need to measure a sample`
- **Simple.** It supports the minimum required and sufficient functionality for most apps.
- **Small.** 1.22 kilobytes (minified and gzipped). No dependencies.
  [Size Limit] controls the size.

```js
import { createContainer } from 'try-di';

const { setValue, setFactory, setClass, resolve } = createContainer();

setValue({ for: Water, use: new Water() });
setFactory({ for: Fish, use: () => new Fish(resolve(Water)) });
setClass({ for: Animal, use: Cat, inject: [Fish, Water] });

assert.ok(resolve(Animal), "Cat wasn't resolved");
```

Supports modern browsers, IE and Node.js. Provides modern ES2019 and CommonJS bundles, as well as legacy ones (ES5).

[size limit]: https://github.com/ai/size-limit
[dependency injection]: https://en.wikipedia.org/wiki/Dependency_injection

### Verify all the dependency mappings in auto-tests

Medium to large projects can have quite a few dependency mappings and sometimes it's easy to just forget to map/register some of the required dependencies and end up with a runtime error.
This container allows you to be sure that all the dependencies can be resolved by using `container.verifyAll()` in your automated-tests (usually they are run on CI)

```js
import { createContainer } from 'try-di';
import { buildYourContainer } from '../app-di';

it('all production container dependencies can be resolved', () => {
  const container = buildYourContainer();
  container.verifyAll(); // fails the test as `Water` mapping is missing
});

// app-di.js
export function buildYourContainer() {
  const container = createContainer();
  const { setValue, setFactory, resolve } = container;

  // setValue({ for: Water, use: new Water() });
  setFactory({ for: Fish, use: () => new Fish(resolve(Water)) });

  return container;
}
```

`TODO: more samples with type-checks and all possible ways to register deps`
