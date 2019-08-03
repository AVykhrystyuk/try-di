export class DependencyInjectionError extends Error {
  public constructor(message: string, innerError?: Error) {
    super(message);

    // to resist minification error name is hard coded
    defineProperty(this, 'name', 'DependencyInjectionError'); // this.constructor.name);

    defineProperty(this, 'innerError', innerError);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      defineProperty(this, 'stack', new Error(message).stack);
    }
  }
}

function defineProperty(obj: any, name: string, value: any): void {
  Object.defineProperty(obj, name, {
    value,
    enumerable: false, // to keep native Error behavior
  });
}
