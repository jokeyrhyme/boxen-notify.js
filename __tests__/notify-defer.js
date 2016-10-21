'use strict'

const EventEmitter = require('events').EventEmitter

const clearRequire = require('clear-require')
const stripAnsi = require('strip-ansi')

const notify = require('../index.js').notify

// mock console.error
let oldConsoleError = console.error
afterEach(() => {
  console.error = oldConsoleError
})

// mock interactive terminal and non-`npm run`-environment
let processEnvBefore = JSON.stringify(process.env)
let isTTYBefore = process.stdout.isTTY
beforeEach(function () {
  ['is-npm'].forEach(clearRequire)
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

// mock process.on
let processOnBefore = process.on
let emit
beforeEach(() => {
  const emitter = new EventEmitter()
  process.on = emitter.on.bind(emitter)
  emit = emitter.emit.bind(emitter)
})
afterEach(() => {
  process.on = processOnBefore
  emit = null
})

test('notify({ message: "hello, world!", defer: true })', () => {
  console.error = jest.fn()
  notify({ message: 'hello, world!', defer: true })
  expect(console.error).not.toBeCalled()

  emit('exit')
  expect(console.error).toHaveBeenCalledTimes(1)

  const uncoloredOutput = stripAnsi(console.error.mock.calls[0][0])
  expect(uncoloredOutput).toMatchSnapshot()
})
