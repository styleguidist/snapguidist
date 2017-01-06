import testQueueFactory from './testQueueFactory'
import renderSnapshot from './renderSnapshot'

export default function snapguidistContextFactory() {
  const queue = testQueueFactory()
  const listeners = new Set()
  const cache = new Map()

  const clear = () => {
    queue.clear()
    listeners.clear()
    cache.clear()
  }

  const runTest = (name, component, update) => {
    // create the component snapshot, already in JSON format
    const snapshot = renderSnapshot(name, component)

    // check if the snapshot is changed from the stored one, if exists
    if (!update && cache.has(name)) {
      const { snapshot: storedSnapshot } = cache.get(name)
      if (snapshot === storedSnapshot) {
        // return false if the test has not been run
        return false
      }
    }

    // update snapshot cache
    cache.set(name, { name, snapshot })

    // add the test to the execution queue
    queue.addTest(name, snapshot, update)

    // return true if the test has not been run
    return true
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
