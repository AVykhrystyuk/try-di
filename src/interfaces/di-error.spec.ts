/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, it } from 'mocha';
import * as assert from 'assert';

import { DependencyInjectionError } from './di-error';

describe('DependencyInjectionError', () => {
  it('is instance of Error', () => {
    const error = new DependencyInjectionError('Error reason message');

    assert.ok(error instanceof Error, 'DependencyInjectionError is not instance of Error ');
  });

  it('`.toString()` displays name and message for a direct call', () => {
    const error = new DependencyInjectionError('Error reason message');

    assert.ok(error.toString().startsWith('DependencyInjectionError: Error reason message'));
  });

  it('`.toString()` displays name, message and innerError for a direct call', () => {
    const innerError = new Error('InnerError');
    const error = new DependencyInjectionError('Error reason message', innerError);

    assert.strictEqual(error.innerError, innerError);

    const str = error.toString();
    assert.ok(str.startsWith('DependencyInjectionError: Error reason message'));
    assert.ok(str.includes(`---> ${innerError.toString()}\n ---x`));
  });

  // eslint-disable-next-line prefer-arrow-callback
  it('`.stack` displays name, message and stackTrace', function stackTraceTestCase() {
    const error = new DependencyInjectionError('Error reason message');

    const stackTrace = error.stack!;
    const stackTraceLines = stackTrace.split('\n');
    assert.ok(stackTrace.startsWith('DependencyInjectionError: Error reason message'));
    assert.ok(stackTraceLines.length > 5);
    assert.strictEqual(stackTraceLines[1].indexOf('stackTraceTestCase'), 15);
  });
});
