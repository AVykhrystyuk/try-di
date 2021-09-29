/* eslint-disable @typescript-eslint/no-parameter-properties */
/* eslint-disable max-classes-per-file */

import { Token } from '../interfaces';

export const stringToken = {
  fish: 'fish' as Token<Fish>,
  milk: 'milk' as Token<Milk>,
  cat: 'cat' as Token<Cat>,
  water: 'water' as Token<Water>,
};

export const symbolToken = {
  fish: Symbol('fish') as Token<Fish>,
  milk: Symbol('milk') as Token<Milk>,
  cat: Symbol('cat') as Token<Cat>,
  water: Symbol('water') as Token<Water>,
};

export class Obj {
  isObject = true;
}

export class Fish extends Obj {
  isFish = true;

  constructor(readonly water: Water) {
    super();
  }
}

export class Water extends Obj {
  isWater = true;
}

export class Milk extends Obj {
  isMilk = true;
}

export class Meat extends Obj {
  isMeat = true;
}

export class Animal extends Obj {
  isAnimal = true;
}

export class Cat extends Animal {
  constructor(readonly fish: Fish, readonly water: Water) {
    super();
  }

  isCat = true;
}

export class Tiger extends Cat {
  constructor(fish: Fish, water: Water, readonly meat: Meat) {
    super(fish, water);
  }

  isTiger = true;
}

export class Dog extends Animal {
  constructor(readonly meat: Meat) {
    super();
  }

  isDog = true;
}

export class Foo {
  isFoo = true;
}

export class Bar extends Foo {
  isBar = true;
}

export class Empty1 {}
export class Empty2 {}
