export class DependencyInjectionError extends Error {
  public constructor(message: string, public readonly innerError?: Error) {
    super(message);

    // to resist minification error name is hard coded
    defineProperty(this, 'name', 'DependencyInjectionError'); // this.constructor.name);
  }
}

function defineProperty(obj: unknown, name: string, value: unknown): void {
  Object.defineProperty(obj, name, {
    value,
    enumerable: false, // to keep native Error behavior
  });
}
