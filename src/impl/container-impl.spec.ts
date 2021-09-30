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

    describe('setClass', () => {
      it('class token', () => {
        container
          .setClass({ for: Water, use: Water })
          .setClass({ for: Fish, use: Fish, inject: [Water] })
          .setClass({ for: Cat, use: Cat, inject: [Fish, Water] });

        assert.ok(container.resolve(Cat).isCat, "Cat wasn't resolved");
      });

      it('symbol token', () => {
        const { fish, cat, water } = symbolToken;

        container
          .setClass({ for: water, use: Water })
          .setClass({ for: fish, use: Fish, inject: [water] })
          .setClass({ for: cat, use: Cat, inject: [fish, water] });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('string token', () => {
        const { fish, cat, water } = stringToken;

        container
          .setClass({ for: water, use: Water })
          .setClass({ for: fish, use: Fish, inject: [water] })
          .setClass({ for: cat, use: Cat, inject: [fish, water] });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('regular - not a singleton', () => {
        container
          .setClass({ for: Water, use: Water })
          .setClass({ for: Fish, use: Fish, inject: [Water] })
          .setClass({ for: Cat, use: Cat, inject: [Fish, Water] });

        assert.notStrictEqual(container.resolve(Fish), container.resolve(Fish));
        assert.notStrictEqual(container.resolve(Water), container.resolve(Water));
        assert.notStrictEqual(container.resolve(Cat), container.resolve(Cat));
      });

      it('singleton', () => {
        container
          .setClass({ for: Water, use: Water })
          .setClass({ for: Fish, use: Fish, inject: [Water], singleton: true })
          .setClass({ for: Cat, use: Cat, inject: [Fish, Water], singleton: true });

        assert.notStrictEqual(container.resolve(Water), container.resolve(Water));
        assert.strictEqual(container.resolve(Fish), container.resolve(Fish));
        assert.strictEqual(container.resolve(Cat), container.resolve(Cat));
        assert.strictEqual(container.resolve(Cat).fish, container.resolve(Fish));
      });

      it('error path - error during resolve', () => {
        const thrownError = new Error('Ops!');
        container
          .setClass({
            for: Meat,
            use: class ThrowableMeat extends Meat {
              constructor() {
                throw thrownError;
                super();
              }
            },
          })
          .setClass({ for: Dog, use: Dog, inject: [Meat] });

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

    describe('setFactory', () => {
      it('class token', () => {
        container
          .setFactory({ for: Water, use: () => new Water() })
          .setFactory({ for: Fish, use: (r) => new Fish(r.resolve(Water)) })
          .setFactory({ for: Cat, use: (r) => new Cat(r.resolve(Fish), r.resolve(Water)) });

        assert.ok(container.resolve(Cat).isCat, "Cat wasn't resolved");
      });

      it('symbol token', () => {
        const { fish, cat, water } = symbolToken;

        container
          .setFactory({ for: water, use: () => new Water() })
          .setFactory({ for: fish, use: (r) => new Fish(r.resolve(water)) })
          .setFactory({ for: cat, use: (r) => new Cat(r.resolve(fish), r.resolve(water)) });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('string token', () => {
        const { fish, cat, water } = stringToken;

        container
          .setFactory({ for: water, use: () => new Water() })
          .setFactory({ for: fish, use: (r) => new Fish(r.resolve(water)) })
          .setFactory({ for: cat, use: (r) => new Cat(r.resolve(fish), r.resolve(water)) });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('regular - not a singleton', () => {
        container
          .setFactory({ for: Water, use: () => new Water() })
          .setFactory({ for: Fish, use: (r) => new Fish(r.resolve(Water)) })
          .setFactory({ for: Cat, use: (r) => new Cat(r.resolve(Fish), r.resolve(Water)) });

        assert.notStrictEqual(container.resolve(Fish), container.resolve(Fish));
        assert.notStrictEqual(container.resolve(Water), container.resolve(Water));
        assert.notStrictEqual(container.resolve(Cat), container.resolve(Cat));
      });

      it('singleton', () => {
        container
          .setFactory({ for: Water, use: () => new Water() })
          .setFactory({ for: Fish, use: (r) => new Fish(r.resolve(Water)), singleton: true })
          .setFactory({ for: Cat, use: (r) => new Cat(r.resolve(Fish), r.resolve(Water)), singleton: true });

        assert.notStrictEqual(container.resolve(Water), container.resolve(Water));
        assert.strictEqual(container.resolve(Fish), container.resolve(Fish));
        assert.strictEqual(container.resolve(Cat), container.resolve(Cat));
        assert.strictEqual(container.resolve(Cat).fish, container.resolve(Fish));
      });

      it('error path - error during resolve', () => {
        const thrownError = new Error('Ops!');
        container
          .setFactory({
            for: Meat,
            use: () => {
              throw thrownError;
            },
          })
          .setFactory({ for: Dog, use: (r) => new Dog(r.resolve(Meat)) });

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

    describe('setValue', () => {
      it('acts as a singleton', () => {
        const water = new Water();
        container.setValue({ for: Water, use: water });

        assert.strictEqual(water, container.resolve(Water));
        assert.strictEqual(container.resolve(Water), container.resolve(Water));
      });

      it('class token', () => {
        container
          .setValue({ for: Water, use: new Water() })
          .setValue({ for: Fish, use: new Fish(container.resolve(Water)) })
          .setValue({ for: Cat, use: new Cat(container.resolve(Fish), container.resolve(Water)) });

        assert.ok(container.resolve(Cat).isCat, "Cat wasn't resolved");
      });

      it('symbol token', () => {
        const { fish, water, cat } = symbolToken;

        container
          .setValue({ for: water, use: new Water() })
          .setValue({ for: fish, use: new Fish(container.resolve(water)) })
          .setValue({ for: cat, use: new Cat(container.resolve(fish), container.resolve(water)) });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });

      it('string token', () => {
        const { fish, water, cat } = stringToken;

        container
          .setValue({ for: water, use: new Water() })
          .setValue({ for: fish, use: new Fish(container.resolve(water)) })
          .setValue({ for: cat, use: new Cat(container.resolve(fish), container.resolve(water)) });

        assert.ok(container.resolve(cat).isCat, "Cat wasn't resolved");
      });
    });

    describe('use mixed registrations', () => {
      it('use factory, value and class all together', () => {
        const { water } = symbolToken;
        const { cat } = stringToken;

        container
          .setFactory({ for: Fish, use: () => new Fish(container.resolve(water)) })
          .setValue({ for: water, use: new Water() })
          .setClass({ for: cat, use: Cat, inject: [Fish, water] });

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
    const { setValue, setFactory, setClass, resolve, tryVerifyAll, verifyAll } = container;

    setValue({ for: Water, use: new Water() });
    setFactory({ for: Fish, use: () => new Fish(resolve(Water)) });
    setClass({ for: Animal, use: Cat, inject: [Fish, Water] });

    assert.ok((container.resolve(Animal) as Cat).isCat, "Cat wasn't resolved");

    assert.strictEqual(tryVerifyAll(), undefined, 'Valid dependencies are not verified');

    verifyAll();
  });
});

function registerResolvableCat(container: Container) {
  container
    .setValue({ for: Water, use: new Water() })
    .setFactory({ for: Fish, use: (r) => new Fish(r.resolve(Water)) })
    .setClass({ for: Cat, use: Cat, inject: [Fish, Water] });
}

function registerUnresolvableCat(container: Container, errorToThrow = new Error('Ops!')) {
  container
    .setValue({ for: Water, use: new Water() })
    .setFactory({
      for: Fish,
      use: () => {
        throw errorToThrow;
      },
    })
    .setClass({ for: Cat, use: Cat, inject: [Fish, Water] });
}
