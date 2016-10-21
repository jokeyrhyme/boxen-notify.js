'use strict'

const clearRequire = require('clear-require')

const notify = require('../index.js').notify

// mock console.error
let oldConsoleError
afterEach(() => {
  console.error = oldConsoleError
})

// mock non-interactive terminal and non-`npm run`-environment
let processEnvBefore
let isTTYBefore
beforeEach(function () {
  ['is-npm'].forEach(clearRequire)
  processEnvBefore = JSON.stringify(process.env)
  isTTYBefore = process.stdout.isTTY
  ;['npm_config_username', 'npm_package_name', 'npm_config_heading'].forEach(function (name) {
    delete process.env[name]
  })
  process.stdout.isTTY = false
})
afterEach(function () {
  ['is-npm'].forEach(clearRequire)
  process.env = JSON.parse(processEnvBefore)
  process.stdout.isTTY = isTTYBefore
})

test('notify({ message: "hello, world!" })', () => {
  console.error = jest.fn()
  notify({ message: 'hello, world!' })
  expect(console.error).not.toBeCalled()
})
