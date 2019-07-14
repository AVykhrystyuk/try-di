import { Foo } from './foo';
import { Baz } from './baz';

export let y = {
  ...{ some: 'value' },
};

export const foo = new Foo();
foo.setBar('123');

// export const baz = new Baz();

export { Foo };
