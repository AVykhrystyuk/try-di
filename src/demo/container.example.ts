/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Fish,
  Milk,
  Animal,
  Cat,
  Dog,
  Obj,
  Water,
  Foo,
  Meat,
  Tiger,
  Empty1,
  Empty2,
} from '../impl/container-types.spec';
import { Container, Token } from '../interfaces';

declare const container: Container;

const fishByClass = container.resolve(Fish);
const fishByString = container.resolve<Fish>('string');
const fishByString2 = container.resolve('string');

container
  .setClass({ for: Animal, use: Cat, inject: [Fish, Water] })
  .setClass({ for: 'Fish' as Token<Fish>, use: Fish, inject: [Water] })
  .setClass({ for: Obj, use: Fish, inject: [Water] })
  // @ts-expect-error - Type Obj is not assignable to Foo
  .setClass({ for: Foo, use: Obj }) // wrong!
  // @ts-expect-error - Type Cat is not assignable to Animal as the `fish` and `water` parameters are missing
  .setClass({ for: Animal, use: Cat }) // wrong! // missing inject: [Fish, Water]
  .setClass({ for: Animal, use: Cat, inject: [Fish, Water] })
  .setClass({ for: Animal, use: Cat, inject: ['Fish' as Token<Fish>, Water] })
  // @ts-expect-error - Type Dog is not assignable to Animal as the `meat` parameter is missing
  .setClass({ for: Animal, use: Dog }) // wrong! // inject: [Meat]
  .setClass({ for: Animal, use: Dog, inject: [Meat] })
  // @ts-expect-error - Type Tiger is not assignable to Animal as the `fish`, `water` and `meat` parameters are missing
  .setClass({ for: Animal, use: Tiger, inject: [Fish] }) // wrong! // inject: [Fish, Water, Meat]
  .setClass({ for: Animal, use: Tiger, inject: [Fish, Water, Meat] })

  .setValue({ for: 'string', use: new Fish(new Water()) })
  .setValue({ for: Fish, use: new Fish(new Water()) })
  // @ts-expect-error - Type Fish is not assignable to Animal
  .setValue({ for: Animal, use: new Fish(new Water()) }) // wrong!

  .setFactory({ for: 'string', use: (r) => new Fish(r.resolve(Water)) })
  // @ts-expect-error - Type Fish is not assignable to Animal
  .setFactory({ for: Animal, use: (r) => new Fish(r.resolve(Water)) }) // wrong!
  .setFactory({ for: Fish, use: (r) => new Fish(r.resolve(Water)), singleton: true })
  .setFactory({ for: Milk, use: () => new Milk() })
  .setFactory({ for: Animal, use: (r) => new Cat(r.resolve(Fish), r.resolve(Water)) })
  // @ts-expect-error - Type Obj is not assignable to Foo
  .setFactory({ for: Foo, use: (r) => new Obj() }) // wrong!

  // typescript issue - Empty1 and Empty2 are equal types in structural type systems
  .setFactory({ for: Empty1, use: () => new Empty2() });
