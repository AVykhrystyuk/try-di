export class Obj {
  public isObject = true;
}

export class Fish extends Obj {
  private isFish = true;
}

export class Milk extends Obj {
  private isMilk = true;
}

export class Meat extends Obj {
  private isMeat = true;
}

export class Animal extends Obj {
  private type: string = 'asd';
}

export class Cat extends Animal {
  public constructor(private readonly fish: Fish, private readonly milk: Milk) {
    super();
  }

  private meow(): void {}
}

export class Tiger extends Cat {
  public constructor(fish: Fish, milk: Milk, private readonly meat: Meat) {
    super(fish, milk);
  }
}

export class Dog extends Animal {
  public constructor(private readonly meat: Meat) {
    super();
  }

  private woof(): void {}
}

export class Foo {
  private isFoo = true;
}

export class Bar extends Foo {
  private isBar = true;
}
