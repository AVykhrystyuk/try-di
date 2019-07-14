import { Baz } from './baz';

export class Foo {
  private bar = new Baz().value;

  public getBar = () => this.bar;
  setBar = (value: string) => {
    this.bar = value;
  };
}

enum TestEnum {
  one = 1,
  two,
}

const en = TestEnum.one;
