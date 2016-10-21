'use strict'

const clearRequire = require('clear-require')

const notify = require('../index.js').notify
const pkg = require('../package.json')

// mock console.error
let oldConsoleError = console.error
afterEach(() => {
  console.error = oldConsoleError
})

// mock interactive terminal and `npm run`-environment
let processEnvBefore = JSON.stringify(process.env)
let isTTYBefore = process.stdout.isTTY
beforeEach(function () {
  ['is-npm'].forEach(clearRequire)
  process.env.npm_config_heading = 'npm'
  process.env.npm_package_name = pkg.name
  process.stdout.isTTY = true
})
afterEach(function () {
  ['is-npm'].forEach(clearRequire)
  process.env = JSON.parse(processEnvBefore)
  process.stdout.isTTY = isTTYBefore
})

test('notify({ message: "hello, world!" })', () => {
  expect(require('is-npm')).toBe(true)
  console.error = jest.fn()
  notify({ message: 'hello, world!' })
  expect(console.error).not.toBeCalled()
})
