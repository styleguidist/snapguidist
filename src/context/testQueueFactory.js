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
          snapshot,
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

        running.set(
          name,
          runTest(snapshot, update)
          .then((response) => {
            notify({ name, response })

            moveQueueForward()
          })
          .catch(moveQueueForward)
        )

        runNextTest()
      }
    }
  }

  /**
   * Add the request to the queue,
   * it'll overwrite queued values to avoid unnecessary test execution
   *
   * @param {string} name - Unique name of the component to be tested
   * @param {string} snapshot - JSON snapshot of the compoennt to be tested
   * @param {boolean} [update] - It specifies if the test must check or update the stored snapshot
   */
  const addTest = (name, snapshot, update) => {
    queue.set(name, { name, snapshot, update })

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

