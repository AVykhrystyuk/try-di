import { describe, it } from 'mocha';
import * as assert from 'assert';

import { Container, DependencyInjectionError } from '../interfaces';
import { ContainerImpl } from './container-impl';
import { createModernFactoryRegistry } from './create-modern-factory-registry';
import { createLegacyFactoryRegistry } from './create-legacy-factory-registry';
import { Cat, Dog, Animal, Water, Fish, Meat, stringToken, symbolToken } from './container-types.spec';

const testBlocks = [
  { title: 'ContainerImpl with ModernFactoryRegistry', makeRegistry: createModernFactoryRegistry },
  { title: 'ContainerImpl with LegacyFactoryRegistry', makeRegistry: createLegacyFactoryRegistry },
];
testBlocks.forEach(({ title, makeRegistry }) => {
  describe(title, () => {
    let container: Container;

    beforeEach(() => {
      container = new ContainerImpl(makeRegistry());
    });

    it('error path - no registration', () => {
      assert.throws(() => container.resolve(Cat), DependencyInjectionError, 'Error is not being thrown');
    });

    describe('useClass', () => {
      it('class token', () => {
        container
          .useClass({ for: Water, use: Water })
          .useClass({ for: Fish, use: Fish, inject: [Water] })
          .useClass({ for: Cat, use: Cat, inject: [Fish, Water] });

        assert.ok(container.resolve(Cat).isCat, "Cat wasn't resolved");
      });

      it('symbol token', () => {
        const { fish, cat, water } = symbolToken;

        container
          .useClass({ for: water, use: Water })
          .useClass({ for: fish, use: Fish, inject: [water] })
          .useClass({ for: cat, use: Cat, inject: [fish, water] });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('string token', () => {
        const { fish, cat, water } = stringToken;

        container
          .useClass({ for: water, use: Water })
          .useClass({ for: fish, use: Fish, inject: [water] })
          .useClass({ for: cat, use: Cat, inject: [fish, water] });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('regular - not a singleton', () => {
        container
          .useClass({ for: Water, use: Water })
          .useClass({ for: Fish, use: Fish, inject: [Water] })
          .useClass({ for: Cat, use: Cat, inject: [Fish, Water] });

        assert.notStrictEqual(container.resolve(Fish), container.resolve(Fish));
        assert.notStrictEqual(container.resolve(Water), container.resolve(Water));
        assert.notStrictEqual(container.resolve(Cat), container.resolve(Cat));
      });

      it('singleton', () => {
        container
          .useClass({ for: Water, use: Water })
          .useClass({ for: Fish, use: Fish, inject: [Water], singleton: true })
          .useClass({ for: Cat, use: Cat, inject: [Fish, Water], singleton: true });

        assert.notStrictEqual(container.resolve(Water), container.resolve(Water));
        assert.strictEqual(container.resolve(Fish), container.resolve(Fish));
        assert.strictEqual(container.resolve(Cat), container.resolve(Cat));
        assert.strictEqual(container.resolve(Cat).fish, container.resolve(Fish));
      });

      it('error path - error during resolve', () => {
        const thrownError = new Error('Ops!');
        container
          .useClass({
            for: Meat,
            use: class ThrowableMeat extends Meat {
              constructor() {
                throw thrownError;
                super();
              }
            },
          })
          .useClass({ for: Dog, use: Dog, inject: [Meat] });

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

    describe('useFactory', () => {
      it('class token', () => {
        container
          .useFactory({ for: Water, use: () => new Water() })
          .useFactory({ for: Fish, use: (r) => new Fish(r.resolve(Water)) })
          .useFactory({ for: Cat, use: (r) => new Cat(r.resolve(Fish), r.resolve(Water)) });

        assert.ok(container.resolve(Cat).isCat, "Cat wasn't resolved");
      });

      it('symbol token', () => {
        const { fish, cat, water } = symbolToken;

        container
          .useFactory({ for: water, use: () => new Water() })
          .useFactory({ for: fish, use: (r) => new Fish(r.resolve(water)) })
          .useFactory({ for: cat, use: (r) => new Cat(r.resolve(fish), r.resolve(water)) });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('string token', () => {
        const { fish, cat, water } = stringToken;

        container
          .useFactory({ for: water, use: () => new Water() })
          .useFactory({ for: fish, use: (r) => new Fish(r.resolve(water)) })
          .useFactory({ for: cat, use: (r) => new Cat(r.resolve(fish), r.resolve(water)) });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('regular - not a singleton', () => {
        container
          .useFactory({ for: Water, use: () => new Water() })
          .useFactory({ for: Fish, use: (r) => new Fish(r.resolve(Water)) })
          .useFactory({ for: Cat, use: (r) => new Cat(r.resolve(Fish), r.resolve(Water)) });

        assert.notStrictEqual(container.resolve(Fish), container.resolve(Fish));
        assert.notStrictEqual(container.resolve(Water), container.resolve(Water));
        assert.notStrictEqual(container.resolve(Cat), container.resolve(Cat));
      });

      it('singleton', () => {
        container
          .useFactory({ for: Water, use: () => new Water() })
          .useFactory({ for: Fish, use: (r) => new Fish(r.resolve(Water)), singleton: true })
          .useFactory({ for: Cat, use: (r) => new Cat(r.resolve(Fish), r.resolve(Water)), singleton: true });

        assert.notStrictEqual(container.resolve(Water), container.resolve(Water));
        assert.strictEqual(container.resolve(Fish), container.resolve(Fish));
        assert.strictEqual(container.resolve(Cat), container.resolve(Cat));
        assert.strictEqual(container.resolve(Cat).fish, container.resolve(Fish));
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

    describe('useValue', () => {
      it('acts as a singleton', () => {
        const water = new Water();
        container.useValue({ for: Water, use: water });

        assert.strictEqual(water, container.resolve(Water));
        assert.strictEqual(container.resolve(Water), container.resolve(Water));
      });

      it('class token', () => {
        container
          .useValue({ for: Water, use: new Water() })
          .useValue({ for: Fish, use: new Fish(container.resolve(Water)) })
          .useValue({ for: Cat, use: new Cat(container.resolve(Fish), container.resolve(Water)) });

        assert.ok(container.resolve(Cat).isCat, "Cat wasn't resolved");
      });

      it('symbol token', () => {
        const { fish, water, cat } = symbolToken;

        container
          .useValue({ for: water, use: new Water() })
          .useValue({ for: fish, use: new Fish(container.resolve(water)) })
          .useValue({ for: cat, use: new Cat(container.resolve(fish), container.resolve(water)) });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('string token', () => {
        const { fish, water, cat } = stringToken;

        container
          .useValue({ for: water, use: new Water() })
          .useValue({ for: fish, use: new Fish(container.resolve(water)) })
          .useValue({ for: cat, use: new Cat(container.resolve(fish), container.resolve(water)) });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });
    });

    describe('use mixed registrations', () => {
      it('use factory, value and class all together', () => {
        const { water } = symbolToken;
        const { cat } = stringToken;

        container
          .useFactory({ for: Fish, use: () => new Fish(container.resolve(water)) })
          .useValue({ for: water, use: new Water() })
          .useClass({ for: cat, use: Cat, inject: [Fish, water] });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });
    });

    describe('tryVerifyAll', () => {
      it('returns false if an error was thrown during a dependency resolve', () => {
        const errorToThrow = new Error('Ops!');
        registerUnresolvableCat(container, errorToThrow);

        const thrownError = container.tryVerifyAll();
        assert.strictEqual(thrownError?.innerError, errorToThrow, 'Invalid dependencies are verified');
      });

      it('returns true when every dependency is resolved', () => {
        registerResolvableCat(container);

        assert.strictEqual(container.tryVerifyAll(), undefined, 'Valid dependencies are not verified');
      });
    });

    describe('verifyAll', () => {
      it('throws when error is thrown during a dependency resolve', () => {
        const errorToThrow = new Error('Ops!');
        registerUnresolvableCat(container, errorToThrow);

        assert.throws(
          () => container.verifyAll(),
          (err: DependencyInjectionError) => err.innerError === errorToThrow,
          'Error is not being thrown'
        );
      });

      it('no error when every dependency is resolved', () => {
        registerResolvableCat(container);

        container.verifyAll();
      });
    });
  });
});

describe('ContainerImpl (registry agnostic)', () => {
  let container: Container;

  beforeEach(() => {
    container = new ContainerImpl(createModernFactoryRegistry());
  });

  it('supports destructuring assignments', () => {
    const { useValue, useFactory, useClass, resolve, tryVerifyAll, verifyAll } = container;

    useValue({ for: Water, use: new Water() });
    useFactory({ for: Fish, use: () => new Fish(resolve(Water)) });
    useClass({ for: Animal, use: Cat, inject: [Fish, Water] });

    assert.ok((container.resolve(Animal) as Cat).isCat, "Cat wasn't resolved");

    assert.strictEqual(tryVerifyAll(), undefined, 'Valid dependencies are not verified');

    verifyAll();
  });
});

function registerResolvableCat(container: Container) {
  container
    .useValue({ for: Water, use: new Water() })
    .useFactory({ for: Fish, use: (r) => new Fish(r.resolve(Water)) })
    .useClass({ for: Cat, use: Cat, inject: [Fish, Water] });
}

function registerUnresolvableCat(container: Container, errorToThrow = new Error('Ops!')) {
  container
    .useValue({ for: Water, use: new Water() })
    .useFactory({
      for: Fish,
      use: () => {
        throw errorToThrow;
      },
    })
    .useClass({ for: Cat, use: Cat, inject: [Fish, Water] });
}
