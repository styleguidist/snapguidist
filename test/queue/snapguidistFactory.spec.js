import snapguidistFactory from '../../src/queue/snapguidistFactory'

jest.mock(
  '../../src/queue/testQueueFactory',
  () => () => {
    const listeners = new Set()
    return {
      addTest: jest.fn(
        (name, snapshot) => listeners.forEach(ls => ls({ [name]: snapshot }))
      ),
      clear: jest.fn(() => listeners.clear()),
      clearListeners: jest.fn(() => listeners.clear()),
      clearQueue: jest.fn(),
      listen: jest.fn((listener) => {
        listeners.add(listener)
        return () => listeners.delete(listener)
      }),
    }
  }
)

jest.mock(
  '../../src/queue/renderSnapshotTree',
  () => component => `"${component}"`
)

global.process = {
  env: {
    SNAPGUIDIST: {
      concurrentTests: 3,
    },
  },
}

test('exposes the expected API', () => {
  const queue = snapguidistFactory()
  const { clear, listen, runTest } = queue

  expect(clear).toBeDefined()
  expect(typeof clear).toBe('function')
  expect(listen).toBeDefined()
  expect(typeof listen).toBe('function')
  expect(runTest).toBeDefined()
  expect(typeof runTest).toBe('function')

  expect(Object.keys(queue).length).toBe(3)
})

test('adds requested snapshot and return an object with isQueuing set to true', () => {
  const { runTest } = snapguidistFactory()

  const result = runTest('name', 'reactElement')
  expect(result).toMatchObject({ isQueuing: true })
})

test('ignores the requested snapshot and return an object with isQueuing set to false', () => {
  const { runTest } = snapguidistFactory()

  runTest('name', 'reactElement')
  const result = runTest('name', 'reactElement')
  expect(result).toMatchObject({
    isQueuing: false,
    response: '"reactElement"',
  })
})

test('registers given listener function', () => {
  const { listen, runTest } = snapguidistFactory()
  const cb = jest.fn()

  listen(cb)
  runTest('name', 'reactElement')

  expect(cb).toHaveBeenCalled()
})

test('returns a unregister function from `listen()` method', () => {
  const { listen, runTest } = snapguidistFactory()
  const cb = jest.fn()

  const unregister = listen(cb)
  unregister()
  runTest('yo')

  expect(cb).not.toHaveBeenCalled()
})

test('notifies all registered listeners', () => {
  const { listen, runTest } = snapguidistFactory()
  const cb1 = jest.fn()
  const cb2 = jest.fn()

  listen(cb1)
  listen(cb2)
  runTest('yo')

  expect(cb1).toHaveBeenCalled()
  expect(cb2).toHaveBeenCalled()
})

test('pasess the same result to every registered listener function', () => {
  const { listen, runTest } = snapguidistFactory()
  const cb = jest.fn()

  listen(cb)
  const name = 'name'
  const elem = 'reactElement'
  runTest(name, elem)

  expect(cb).toHaveBeenCalledWith({ [name]: `"${elem}"` })
})

test('removes all registered listeners', () => {
  const { clear, listen, runTest } = snapguidistFactory()
  const cb1 = jest.fn()
  const cb2 = jest.fn()

  listen(cb1)
  listen(cb2)
  runTest('yo', 'snapshot')

  expect(cb1).toHaveBeenCalled()
  expect(cb2).toHaveBeenCalled()

  clear()
  cb1.mockClear()
  cb2.mockClear()
  runTest('yo', 'snapshot')

  expect(cb1).not.toHaveBeenCalled()
  expect(cb2).not.toHaveBeenCalled()
})
