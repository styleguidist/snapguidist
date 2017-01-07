import testQueueFactory from '../../src/context/testQueueFactory'
import runTest from '../../src/context/runTest'

jest.mock(
  '../../src/context/pubSubFactory',
  () => () => {
    const listeners = new Set()
    return {
      clearListeners: jest.fn(() => listeners.clear()),
      listen: jest.fn((listener) => {
        listeners.add(listener)
        return () => listeners.delete(listener)
      }),
      notify: jest.fn((...args) => listeners.forEach(ls => ls(...args))),
    }
  }
)

jest.mock(
  '../../src/context/runTest',
  () => jest.fn(() => Promise.resolve({ pass: true }))
)

function delay(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time))
}

beforeEach(() => runTest.mockClear())

test('should expose the expected API', () => {
  const queue = testQueueFactory()
  const {
    addTest,
    clear,
    clearListeners,
    clearQueue,
    listen,
  } = queue

  expect(addTest).toBeDefined()
  expect(typeof addTest).toBe('function')
  expect(clear).toBeDefined()
  expect(typeof clear).toBe('function')
  expect(clearListeners).toBeDefined()
  expect(typeof clearListeners).toBe('function')
  expect(clearQueue).toBeDefined()
  expect(typeof clearQueue).toBe('function')
  expect(listen).toBeDefined()
  expect(typeof clearQueue).toBe('function')

  expect(Object.keys(queue).length).toBe(5)
})

test('should start the queue when adding a test', () => {
  const {
    addTest,
  } = testQueueFactory()

  addTest('name', 'snapshot')
  expect(runTest).toHaveBeenCalled()
})

test('should pass `update` flag to runTest()', () => {
  const {
    addTest,
  } = testQueueFactory()

  addTest('name', 'snapshot', true)
  expect(runTest).toHaveBeenCalledWith('snapshot', true)
})

test('should notify listeners when a test return its result', () => {
  const {
    addTest,
    listen,
  } = testQueueFactory()

  const listener = jest.fn()
  listen(listener)
  addTest('name', 'snapshot')

  return delay(50).then(() => {
    expect(listener).toHaveBeenCalledWith({
      response: { pass: true },
      name: 'name',
      snapshot: 'snapshot',
      update: undefined,
    })
  })
})

test('should return a `unregister` function when invoking listen()', () => {
  const {
    addTest,
    listen,
  } = testQueueFactory()

  const listener = jest.fn()
  const unregister = listen(listener)
  expect(typeof unregister).toBe('function')
  unregister()
  addTest('name', 'snapshot')

  return delay(50).then(() => {
    expect(listener).not.toHaveBeenCalled()
  })
})

test('should remove all listeners', () => {
  const {
    addTest,
    clear,
    listen,
  } = testQueueFactory()

  const listener1 = jest.fn()
  listen(listener1)
  const listener2 = jest.fn()
  listen(listener2)

  clear()
  addTest('name', 'snapshot')

  return delay(50).then(() => {
    expect(listener1).not.toHaveBeenCalled()
    expect(listener2).not.toHaveBeenCalled()
  })
})

