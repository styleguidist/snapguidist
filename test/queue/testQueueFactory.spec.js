import testQueueFactory from '../../src/queue/testQueueFactory'
import runTests from '../../src/queue/runTests'

// TODO: Add test for batched execution!

jest.mock(
  '../../src/queue/pubSubFactory',
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
  '../../src/queue/runTests',
  () => jest.fn((snapshots = []) => {
    const result = snapshots.reduce((acc, snapshot) => {
      const { name } = snapshot
      acc[name] = { pass: true }
      return acc
    }, {})
    return Promise.resolve(result)
  })
)

const mockSnapshot = '{"name":"name","tree":"snapshot"}'

beforeEach(() => runTests.mockClear())

test('exposes the expected API', () => {
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

test('starts the queue when adding a test', () => {
  const {
    addTest,
  } = testQueueFactory({ batch: { enabled: false } })

  addTest('name', mockSnapshot)
  expect(runTests).toHaveBeenCalled()
})

test('passes `update` flag to runTest()', () => {
  const {
    addTest,
  } = testQueueFactory({ batch: { enabled: false } })

  const name = 'name'
  const update = true
  const snapshots = [{ name, tree: mockSnapshot, update }]

  addTest(name, mockSnapshot, update)
  expect(runTests).toHaveBeenCalledWith(snapshots)
})

test('notifies listeners when a test return its result', () => {
  const {
    addTest,
    listen,
  } = testQueueFactory({ batch: { enabled: false } })

  const listener = jest.fn()
  listen(listener)
  const name = 'name'
  addTest(name, mockSnapshot)

  return Promise.resolve().then(() => {
    expect(listener).toHaveBeenCalledWith({ [name]: { pass: true } })
  })
})

test('returns a `unregister` function when invoking listen()', () => {
  const {
    addTest,
    listen,
  } = testQueueFactory()

  const listener = jest.fn()
  const unregister = listen(listener)
  expect(typeof unregister).toBe('function')
  unregister()
  addTest('name', mockSnapshot)

  return Promise.resolve().then(() => {
    expect(listener).not.toHaveBeenCalled()
  })
})

test('removes all listeners', () => {
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
  addTest('name', mockSnapshot)

  return Promise.resolve().then(() => {
    expect(listener1).not.toHaveBeenCalled()
    expect(listener2).not.toHaveBeenCalled()
  })
})

