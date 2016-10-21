# boxen-notify [![npm](https://img.shields.io/npm/v/boxen-notify.js.svg?maxAge=2592000)](https://www.npmjs.com/package/boxen-notify.js)

show a message in a box (extracted from update-notifier)


## Usage


### `notify(options: BoxenNotifyOptions)`

```flowtype
type BoxenNotifyOptions = {
  boxenOpts?: BoxenOptions,
  defer?: boolean,
  message?: string
}
```

-   see upstream documentation for [BoxenOptions](see: https://github.com/sindresorhus/boxen#boxeninput-options)

-   output **message** now, or **defer** until the process exits

-   same behaviour as upstream: does nothing if not in an interactive terminal, or if run as part of an `npm run` script


### Example

```js
const { notify } = require('boxen-notify')

notify({ message: 'hello, world!' })
```


## Contributing


### Development

```sh
npm install --global flow-typed
npm install
flow-typed install
npm test
```


## Resources

-   [boxen](https://github.com/sindresorhus/boxen)

-   [update-notifier](https://github.com/yeoman/update-notifier)
