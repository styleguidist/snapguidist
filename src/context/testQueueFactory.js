import runTest from './runTest'
import pubSubFactory from './pubSubFactory'

export default function testQueueFactory(size = 1) {
  const pubSub = pubSubFactory()
  const { clearListeners, listen, notify } = pubSub

  const queue = new Map()
  const running = new Map()
  let queueIterator

  const clearQueue = () => {
    queue.clear()
    queueIterator = null
  }

  const clear = () => {
    clearQueue()
    clearListeners()
  }

  const runNextTest = () => {
    if (queueIterator && running.size < size) {
      const {
        done,
        value: {
          name,
          snapshot,
          update,
        } = {},
      } = queueIterator.next()

      if (done) {
        // if the queue is complete clear the iterator
        queueIterator = null
      } else {
        // start a new test
        const moveQueueForward = () => {
          running.delete(name)
          runNextTest()
        }

        // run the test and add it to the `running` queue
        running.set(
          name,
          runTest(snapshot, update)
          .then((response) => {
            // notify listenrs of test completion
            notify({ response, name, snapshot, update })

            // try to move the queue forward
            moveQueueForward()
          })
          .catch(moveQueueForward)
        )

        // try to move the queue forward
        runNextTest()
      }
    }
  }

  const addTest = (name, snapshot, update) => {
    // Add the request to the queue,
    // it'll overwrite queued values to avoid unnecessary test execution
    queue.set(name, { name, snapshot, update })

    // initialize the iterator if is not already available
    if (!queueIterator) {
      queueIterator = queue.values()
    }

    // try to move the queue forward
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

