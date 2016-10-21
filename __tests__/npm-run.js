'use strict'

const clearRequire = require('clear-require')

const notify = require('../index.js').notify

// mock console.error
let oldConsoleError = console.error
afterEach(() => {
  console.error = oldConsoleError
})

// mock interactive terminal and `npm run`-environment
let isTTYBefore = process.stdout.isTTY
beforeEach(function () {
  ['is-npm'].forEach(clearRequire)
  process.stdout.isTTY = true
})
afterEach(function () {
  ['is-npm'].forEach(clearRequire)
  process.stdout.isTTY = isTTYBefore
})

test('notify({ message: "hello, world!" })', () => {
  expect(require('is-npm')).toBe(true)
  console.error = jest.fn()
  notify({ message: 'hello, world!' })
  expect(console.error).not.toBeCalled()
})
