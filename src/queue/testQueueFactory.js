import runTests from './runTests'
import pubSubFactory from './pubSubFactory'

export default function testQueueFactory({
  size = 3,
  batch: {
    enabled: batchEnabled = true,
    interval: batchInterval = 1500,
  } = {},
} = {}) {
  const pubSub = pubSubFactory()
  const { clearListeners, listen, notify } = pubSub

  const queue = new Map()
  const running = new Map()
  let queueIterator
  let isBatching
  let batchedSessionID

  const clearQueue = () => {
    queue.clear()
    queueIterator = null
  }

  const clear = () => {
    clearQueue()
    clearListeners()
    if (batchedSessionID) {
      clearTimeout(batchedSessionID)
    }
  }

  const executeTest = (snapshots, moveQueueForward) => {
    runTests(snapshots)
      .then((response) => {
        notify(response)

        moveQueueForward()
      })
      .catch(moveQueueForward)
  }

  const startBatchedSession = () => {
    batchedSessionID = setTimeout(() => {
      isBatching = true

      const moveQueueForward = () => {
        running.clear()
        batchedSessionID = null
        isBatching = false
        runNextTest() // eslint-disable-line no-use-before-define
      }

      const snapshots = []
      running.forEach(info => snapshots.push(info))
      executeTest(snapshots, moveQueueForward)
    }, batchInterval)
  }

  const runNextTest = () => {
    if (isBatching && running.size === size) {
      return
    }

    if (queueIterator && running.size < size) {
      const {
        done,
        value: {
          name,
          tree,
          update,
        } = {},
      } = queueIterator.next()

      if (done) {
        queueIterator = null
      } else {
        const moveQueueForward = () => {
          running.delete(name)
          runNextTest()
        }

        queue.delete(name)

        if (batchEnabled && !isBatching) {
          startBatchedSession()
        }

        const snapshotAction = { name, tree, update }
        running.set(name, snapshotAction)

        if (!batchEnabled) {
          executeTest([snapshotAction], moveQueueForward)
        }

        runNextTest()
      }
    }
  }

  // Add the request to the queue,
  // it'll overwrite queued values to avoid unnecessary test execution
  const addTest = (name, tree, update) => {
    queue.set(name, { name, tree, update })

    if (!queueIterator) {
      queueIterator = queue.values()
    }

    runNextTest()
  }

  return {
    addTest,
    clear,
    clearListeners,
    clearQueue,
    listen,
  }
}

