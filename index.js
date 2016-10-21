/* @flow */
'use strict'

/* ::
type BoxenOptions = { [id:string]: any }
// see: https://github.com/sindresorhus/boxen#boxeninput-options

type BoxenNotifyOptions = {
  boxenOpts?: BoxenOptions,
  defer?: boolean,
  message?: string
}
*/

// https://github.com/yeoman/update-notifier/blob/v1.0.2/index.js#L104

function notify (opts /* : BoxenNotifyOptions */) {
  const isNpm = require('is-npm')
  if (!process.stdout.isTTY || isNpm) {
    return
  }

  const boxen = require('boxen')

  opts = opts || {}

  opts.defer = typeof opts.defer === 'boolean' ? opts.defer : false
  opts.message = opts.message || ''

  opts.boxenOpts = opts.boxenOpts || {
    padding: 1,
    margin: 1,
    align: 'center',
    borderColor: 'yellow',
    borderStyle: 'round'
  }

  const message = '\n' + boxen(opts.message, opts.boxenOpts)

  if (opts.defer === false) {
    console.error(message)
  } else {
    process.on('exit', function () {
      console.error(message)
    })

    process.on('SIGINT', function () {
      console.error('\n' + message)
    })
  }
}

module.exports = {
  notify
}
