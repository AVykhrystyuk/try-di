# try-di

[![Build Status](https://travis-ci.com/AVykhrystyuk/try-di.svg?branch=master)](https://travis-ci.com/AVykhrystyuk/try-di)
[![Coverage Status](https://coveralls.io/repos/github/AVykhrystyuk/try-di/badge.svg)](https://coveralls.io/github/AVykhrystyuk/try-di)

Try DI is a simple, typesafe and lightweight dependency injection container for TypeScript. Designed with the idea to avoid having runtime errors due to missing, incorrect or outdated mapping configuration.

- **Safe.** It type-checks every mapping. Allows to verify all the mappings on CI.
- **Fast.** `TODO: need to measure a sample`
- **Simple.** It supports the minimum required and sufficient functionality for most apps.
- **Small.** 828 bytes (minified and gzipped). No dependencies.
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

`TODO: more samples - how to verifyAll() and all possible ways to register deps`
