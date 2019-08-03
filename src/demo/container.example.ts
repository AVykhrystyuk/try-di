/* eslint-disable @typescript-eslint/no-unused-vars, class-methods-use-this */

import { Fish, Milk, Animal, Cat, Obj } from './types';
import { Container } from '../interfaces';

declare const container: Container;

const fishByClass = container.resolve(Fish);
const fishByString = container.resolve<Fish>('string');
const fishByString2 = container.resolve('string');

// const ctor2: InstanceType<typeof Fish> = new Fish();
// const ctor: InstanceType<Fish> = function factory__(...args: any[]) { return new Fish(); };
// console.log(ctor, ctor2);

container.register('string', () => new Fish());
container.register(Fish, () => new Fish());
container.register(Milk, () => new Milk());
container.register(Animal, r => new Cat(r.resolve(Fish), r.resolve(Milk)));

// container.register(Milk, () => new Milk()).singleton();
// container.register(Animal, r => new Cat(r.resolve(Fish), r.resolve(Milk))).singleton();

// container.registserClass(Animal, Cat, [Fish, Milk]);

// container.registserClass(Animal, Cat).singleton();
// container.registserClass(Animal, Cat).singleton().injecting(Fish, Milk); -- X
// container.registserClass(Animal, Cat).injecting(Fish, Milk).singleton();

// container.register({
//   token: Animal,
//   resolve: Cat,
//   deps: [Fish, Milk],
//   singleton: true,
// });

/*
  { provide: APP_CONFIG, useValue: HERO_DI_CONFIG },
  { provide: AbstractHeroService, useClass: HeroService },
  {
    provide: HeroService,
    useFactory: heroServiceFactory,
    deps: [Logger, UserService]
  };

*/
