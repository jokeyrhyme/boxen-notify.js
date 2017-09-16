'use strict';

jest.unmock('is-npm');

const notify = require('../index.js').notify;

// mock console.error
let oldConsoleError = console.error;
afterEach(() => {
  console.error = oldConsoleError;
});

// mock interactive terminal
let isTTYBefore = process.stdout.isTTY;
beforeEach(function() {
  process.stdout.isTTY = true;
});
afterEach(function() {
  process.stdout.isTTY = isTTYBefore;
});

test('notify({ message: "hello, world!" })', () => {
  expect(require('is-npm')).toBe(true);
  console.error = jest.fn();
  notify({ message: 'hello, world!' });
  expect(console.error).not.toBeCalled();
});
