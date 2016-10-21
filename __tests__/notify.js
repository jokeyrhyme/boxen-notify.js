'use strict'

const clearRequire = require('clear-require')
const stripAnsi = require('strip-ansi')

const notify = require('../index.js').notify

// mock console.error
let oldConsoleError = console.error
afterEach(() => {
  console.error = oldConsoleError
})

// mock interactive terminal and non-`npm run`-environment
let processEnvBefore
let isTTYBefore = process.stdout.isTTY
beforeEach(function () {
  ['is-npm'].forEach(clearRequire)
  processEnvBefore = JSON.stringify(process.env)
  ;['npm_config_username', 'npm_package_name', 'npm_config_heading'].forEach(function (name) {
    delete process.env[name]
  })
  process.stdout.isTTY = true
})
afterEach(function () {
  ['is-npm'].forEach(clearRequire)
  process.env = JSON.parse(processEnvBefore)
  process.stdout.isTTY = isTTYBefore
})

test('notify({ message: "hello, world!" })', () => {
  console.error = jest.fn()
  notify({ message: 'hello, world!' })
  expect(console.error).toHaveBeenCalledTimes(1)

  const uncoloredOutput = stripAnsi(console.error.mock.calls[0][0])
  expect(uncoloredOutput).toMatchSnapshot()
})
