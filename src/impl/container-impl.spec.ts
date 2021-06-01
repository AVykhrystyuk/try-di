import { describe, it } from 'mocha';
import * as assert from 'assert';

import { Container, DependencyInjectionError } from '../interfaces';
import { ContainerImpl } from './container-impl';
import { createModernFactoryRegistry } from './create-modern-factory-registry';
import { Cat, Dog, Fish, Meat, Milk, stringToken, symbolToken } from './container-types.spec';

describe('ContainerImpl', () => {
  describe('with ModernFactoryRegistry', () => {
    let container: Container;

    beforeEach(() => {
      container = new ContainerImpl(createModernFactoryRegistry());
    });

    describe('useFactory', () => {
      it('class token', () => {
        container
          .useFactory({ for: Fish, use: () => new Fish() })
          .useFactory({ for: Milk, use: () => new Milk() })
          .useFactory({ for: Cat, use: (r) => new Cat(r.resolve(Fish), r.resolve(Milk)) });

        assert.ok(container.resolve(Cat).isCat, "Cat wasn't resolved");
      });

      it('symbol token', () => {
        const { fish, milk, cat } = symbolToken;

        container
          .useFactory({ for: fish, use: () => new Fish() })
          .useFactory({ for: milk, use: () => new Milk() })
          .useFactory({ for: cat, use: (r) => new Cat(r.resolve(fish), r.resolve(milk)) });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('string token', () => {
        const { fish, milk, cat } = stringToken;

        container
          .useFactory({ for: fish, use: () => new Fish() })
          .useFactory({ for: milk, use: () => new Milk() })
          .useFactory({ for: cat, use: (r) => new Cat(r.resolve(fish), r.resolve(milk)) });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('regular - not a singleton', () => {
        container
          .useFactory({ for: Fish, use: () => new Fish() })
          .useFactory({ for: Milk, use: () => new Milk() })
          .useFactory({ for: Cat, use: (r) => new Cat(r.resolve(Fish), r.resolve(Milk)) });

        assert.notStrictEqual(container.resolve(Fish), container.resolve(Fish));
        assert.notStrictEqual(container.resolve(Milk), container.resolve(Milk));
        assert.notStrictEqual(container.resolve(Cat), container.resolve(Cat));
      });

      it('singleton', () => {
        container
          .useFactory({ for: Fish, use: () => new Fish() })
          .useFactory({ for: Milk, use: () => new Milk(), singleton: true })
          .useFactory({ for: Cat, use: (r) => new Cat(r.resolve(Fish), r.resolve(Milk)), singleton: true });

        assert.notStrictEqual(container.resolve(Fish), container.resolve(Fish));
        assert.strictEqual(container.resolve(Milk), container.resolve(Milk));
        assert.strictEqual(container.resolve(Cat), container.resolve(Cat));
        assert.strictEqual(container.resolve(Cat).milk, container.resolve(Milk));
      });

      it('error path - no registration', () => {
        assert.throws(() => container.resolve(Cat), DependencyInjectionError, 'Error is not being thrown');
      });

      it('error path - error during resolve', () => {
        const thrownError = new Error('Ops!');
        container
          .useFactory({
            for: Meat,
            use: () => {
              throw thrownError;
            },
          })
          .useFactory({ for: Dog, use: (r) => new Dog(r.resolve(Meat)) });

        assert.throws(
          () => container.resolve(Meat),
          (err: DependencyInjectionError) => err.innerError === thrownError,
          'Error is not being thrown'
        );
        assert.throws(
          () => container.resolve(Dog),
          (err: DependencyInjectionError) => (err.innerError as DependencyInjectionError).innerError === thrownError,
          'Error is not being thrown'
        );
      });
    });
  });
});
