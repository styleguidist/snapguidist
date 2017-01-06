import runTest from './runTest'
import pubSubFactory from './pubSubFactory'

export default function testQueueFactory(size = 3) {
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
          example,
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
          runTest(name, example, update)
          .then((response) => {
            // notify listenrs of test completion
            notify({ response, name, example, update })

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

  const addTest = (name, example, update) => {
    // Add the request to the queue,
    // it'll overwrite queued values to avoid unnecessary test execution
    queue.set(name, { name, example, update })

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

