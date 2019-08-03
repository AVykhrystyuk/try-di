export class Obj {
  private isObject = true;
}

export class Fish extends Obj {
  private isFish = true;
}

export class Milk extends Obj {
  private isMilk = true;
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

export class Bar {}

export class Foo extends Bar {
  private notAnimalMethod(): void {}
  // public notAnimal: string;
}
