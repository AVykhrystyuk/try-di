import { describe, it } from 'mocha';
import * as assert from 'assert';

import { DependencyInjectionError } from './di-error';

describe('DependencyInjectionError', () => {
  it('is instance of Error', () => {
    const error = new DependencyInjectionError('Error reason message');

    assert.ok(error instanceof Error);
  });

  it('`.toString()` displays name and the message for a direct call', () => {
    const error = new DependencyInjectionError('Error reason message');

    assert.strictEqual(error.toString(), 'DependencyInjectionError: Error reason message');
  });

  // eslint-disable-next-line prefer-arrow-callback
  it('`.stack` displays name and the message and the stackTrace', function stackTraceTestCase() {
    const error = new DependencyInjectionError('Error reason message');

    const stackTrace = error.stack as string;
    const stackTraceLines = stackTrace.split('\n');
    assert.ok(stackTrace.startsWith('DependencyInjectionError: Error reason message'));
    assert.ok(stackTraceLines.length > 5);
    assert.strictEqual(stackTraceLines[1].indexOf('stackTraceTestCase'), 15);
  });
});
