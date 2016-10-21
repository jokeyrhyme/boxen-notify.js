'use strict'

const clearRequire = require('clear-require')

const notify = require('../index.js').notify

// mock console.error
let oldConsoleError
afterEach(() => {
  console.error = oldConsoleError
})

// mock interactive terminal and `npm run`-environment
let isTTYBefore
beforeEach(function () {
  ['is-npm'].forEach(clearRequire)
  isTTYBefore = process.stdout.isTTY
  process.stdout.isTTY = true
})
afterEach(function () {
  ['is-npm'].forEach(clearRequire)
  process.stdout.isTTY = isTTYBefore
})

test('notify({ message: "hello, world!" })', () => {
  console.error = jest.fn()
  notify({ message: 'hello, world!' })
  expect(console.error).not.toBeCalled()
})
