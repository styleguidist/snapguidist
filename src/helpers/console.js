/* eslint-disable no-console */

const consoleError = console.error

console.error = (message) => {
  const error = /Expected onBeforeMountComponent\(\) parent and onSetChildren\(\) to be consistent/
  if (!error.test(message)) {
    consoleError(message)
  }
}
