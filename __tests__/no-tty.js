'use strict';

jest.mock('is-npm');

const notify = require('../index.js').notify;

// mock console.error
let oldConsoleError = console.error;
afterEach(() => {
  console.error = oldConsoleError;
});

// mock non-interactive terminal
let isTTYBefore = process.stdout.isTTY;
beforeEach(function() {
  process.stdout.isTTY = false;
});
afterEach(function() {
  process.stdout.isTTY = isTTYBefore;
});

test('notify({ message: "hello, world!" })', () => {
  console.error = jest.fn();
  notify({ message: 'hello, world!' });
  expect(console.error).not.toBeCalled();
});
