/* eslint-disable @typescript-eslint/no-unused-vars, class-methods-use-this */

import { Fish, Milk, Animal, Cat, Dog, Obj, Bar, Foo, Meat, Tiger } from './types';
import { Container, Token } from '../interfaces';

declare const container: Container;

const fishByClass = container.resolve(Fish);
const fishByString = container.resolve<Fish>('string');
const fishByString2 = container.resolve('string');

container
  .useClass({ for: Animal, use: Cat, inject: [Fish, Milk] })
  .useClass({ for: 'Fish' as Token<Fish>, use: Fish })
  .useClass({ for: Obj, use: Fish })
  // @ts-expect-error - Type Obj is not assignable to Foo
  .useClass({ for: Foo, use: Obj }) // wrong!
  // @ts-expect-error - Type Cat is not assignable to Animal as the `fish` and `milk` parameters are missing
  .useClass({ for: Animal, use: Cat }) // wrong! // missing inject: [Fish, Milk]
  .useClass({ for: Animal, use: Cat, inject: [Fish, Milk] })
  .useClass({ for: Animal, use: Cat, inject: ['Fish' as Token<Fish>, Milk] })
  // @ts-expect-error - Type Dog is not assignable to Animal as the `meat` parameter is missing
  .useClass({ for: Animal, use: Dog }) // wrong! // inject: [Meat]
  .useClass({ for: Animal, use: Dog, inject: [Meat] })
  // @ts-expect-error - Type Tiger is not assignable to Animal as the `fish`, `milk` and `meat` parameters are missing
  .useClass({ for: Animal, use: Tiger, inject: [Fish] }) // wrong! // inject: [Fish, Milk, Meat]
  .useClass({ for: Animal, use: Tiger, inject: [Fish, Milk, Meat] })

  .useValue({ for: 'string', use: new Fish() })
  .useValue({ for: Fish, use: new Fish() })
  // @ts-expect-error - Type Fish is not assignable to Animal
  .useValue({ for: Animal, use: new Fish() }) // wrong!

  .useFactory({ for: 'string', use: () => new Fish() })
  // @ts-expect-error - Type Fish is not assignable to Animal
  .useFactory({ for: Animal, use: () => new Fish() }) // wrong!
  .useFactory({ for: Fish, use: () => new Fish(), singleton: true })
  .useFactory({ for: Milk, use: () => new Milk() })
  .useFactory({ for: Animal, use: r => new Cat(r.resolve(Fish), r.resolve(Milk)) })
  // @ts-expect-error - Type Obj is not assignable to Foo
  .useFactory({ for: Foo, use: r => new Obj() }); // wrong!
