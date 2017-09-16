'use strict';

const stripAnsi = require('strip-ansi');

jest.mock('is-npm');

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
  console.error = jest.fn();
  notify({ message: 'hello, world!' });
  expect(console.error).toHaveBeenCalledTimes(1);

  const uncoloredOutput = stripAnsi(console.error.mock.calls[0][0]);
  expect(uncoloredOutput).toMatchSnapshot();
});
