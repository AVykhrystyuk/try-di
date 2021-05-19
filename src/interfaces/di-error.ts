export class DependencyInjectionError extends Error {
  public constructor(message: string, public readonly innerError?: Error) {
    super(message);

    // to resist minification error name is hard coded
    defineProperty(this, 'name', 'DependencyInjectionError'); // this.constructor.name);
  }

  toString(): string {
    const { innerError, stack } = this;

    const title = getTitle(this);
    let result = title;

    if (innerError != null) {
      result += `\n ---> ${innerError.toString()}\n ---x ${getTitle(innerError)}`;
    }

    if (stack) {
      const stackWithoutTitle = stack.startsWith(title) ? stack.substr(title.length) : stack;
      result += stackWithoutTitle;
    }

    return result;
  }
}

function getTitle(err: Error): string {
  const { name, message } = err;
  return message ? `${name}: ${message}` : name;
}

function defineProperty(obj: unknown, name: string, value: unknown): void {
  Object.defineProperty(obj, name, {
    value,
    enumerable: false, // to keep native Error behavior
  });
}
