import testQueueFactory from './testQueueFactory'
import renderSnapshotTree from './renderSnapshotTree'

export default function snapguidistFactory() {
  const { concurrentTests } = process.env.SNAPGUIDIST

  const queue = testQueueFactory(concurrentTests)
  const listeners = new Set()
  const cache = new Map()

  const clear = () => {
    queue.clear()
    listeners.clear()
    cache.clear()
  }

  // It creates the component tree, already in JSON format and
  // then check if the tree is changed from the one stored from last execution.
  const runTest = (name, component, update) => {
    const tree = renderSnapshotTree(component)

    if (!update && cache.has(name)) {
      const { tree: storedSnapshot, response } = cache.get(name)
      if (tree === storedSnapshot) {
        return { isQueuing: false, response }
      }
    }

    cache.set(name, { name, tree })
    queue.addTest(name, tree, update)

    return { isQueuing: true }
  }

  const listen = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const handleQueueNotification = (responses = {}) => {
    Object.keys(responses).forEach(
      (name) => {
        const cached = cache.get(name)
        cache.set(name, Object.assign({}, cached, { response: responses[name] }))
      }
    )
    listeners.forEach(listener => listener(responses))
  }

  const init = () => queue.listen(handleQueueNotification)
  init()

  return {
    clear,
    listen,
    runTest,
  }
}
