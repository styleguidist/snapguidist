import testQueueFactory from './testQueueFactory'

export default function snapguidistContextFactory() {
  const queue = testQueueFactory()
  const listeners = new Set()

  const clear = () => {
    queue.clear()
    listeners.clear()
  }

  const runTest = (name, example, update) => {
    queue.addTest(name, example, update)
  }

  const listen = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  // listen for queue event
  queue.listen(({ name, response }) => listeners.forEach(listener => listener({ name, response })))

  return {
    clear,
    listen,
    runTest,
  }
}
