import testQueueFactory from './testQueueFactory'
import renderSnapshot from './renderSnapshot'

export default function snapguidistContextFactory() {
  const { concurrentTests } = process.env.SNAPGUIDIST

  const queue = testQueueFactory(concurrentTests)
  const listeners = new Set()
  const cache = new Map()

  const clear = () => {
    queue.clear()
    listeners.clear()
    cache.clear()
  }

  /**
   * It creates the component snapshot, already in JSON format and
   * then check if the snapshot is changed from the one stored from last execution.
   *
   * @param {string} name - Unique name of the component to be tested
   * @param {ReactElement} component - ReactElement of the compoennt to be tested
   * @param {boolean} [update] - It specifies if the test must check or update the stored snapshot
   * @return {boolean} Returns true if the test is run, false otherwise
   */
  const runTest = (name, component, update) => {
    const snapshot = renderSnapshot(name, component)

    if (!update && cache.has(name)) {
      const { snapshot: storedSnapshot, response } = cache.get(name)
      if (snapshot === storedSnapshot) {
        return { isFetching: false, response }
      }
    }

    cache.set(name, { name, snapshot })
    queue.addTest(name, snapshot, update)

    return { isFetching: true }
  }

  const listen = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const handleQueueNotification = ({ name, response }) => {
    const cached = cache.get(name)
    cache.set(name, Object.assign({}, cached, { response }))
    listeners.forEach(listener => listener({ name, response }))
  }

  const init = () => queue.listen(handleQueueNotification)
  init()

  return {
    clear,
    listen,
    runTest,
  }
}
