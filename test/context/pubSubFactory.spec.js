import pubSubFactory from '../../src/context/pubSubFactory'

test('should expose the expected API', () => {
  const pubSub = pubSubFactory()
  const { clearListeners, listen, notify } = pubSub

  expect(clearListeners).toBeDefined()
  expect(typeof clearListeners).toBe('function')
  expect(listen).toBeDefined()
  expect(typeof listen).toBe('function')
  expect(notify).toBeDefined()
  expect(typeof notify).toBe('function')

  expect(Object.keys(pubSub).length).toBe(3)
})

test('should register given listener function', () => {
  const { listen, notify } = pubSubFactory()
  const cb = jest.fn()

  listen(cb)
  notify('yo')

  expect(cb).toHaveBeenCalled()
})

test('should return a unregister function from `listen()` method', () => {
  const { listen, notify } = pubSubFactory()
  const cb = jest.fn()

  const unregister = listen(cb)
  unregister()
  notify('yo')

  expect(cb).not.toHaveBeenCalled()
})

test('should notify all registered listeners', () => {
  const { listen, notify } = pubSubFactory()
  const cb1 = jest.fn()
  const cb2 = jest.fn()

  listen(cb1)
  listen(cb2)
  notify('yo')

  expect(cb1).toHaveBeenCalled()
  expect(cb2).toHaveBeenCalled()
})

test('should pass any received argument to every registered listener function', () => {
  const { listen, notify } = pubSubFactory()
  const cb = jest.fn()

  const data = [1, 2, 3]
  listen(cb)
  notify('yo', data, 67)

  expect(cb).toHaveBeenCalledWith('yo', data, 67)
})

test('should remove all registered listeners', () => {
  const { clearListeners, listen, notify } = pubSubFactory()
  const cb1 = jest.fn()
  const cb2 = jest.fn()

  listen(cb1)
  listen(cb2)
  notify('yo')

  expect(cb1).toHaveBeenCalled()
  expect(cb2).toHaveBeenCalled()

  clearListeners()
  cb1.mockClear()
  cb2.mockClear()
  notify('yo')

  expect(cb1).not.toHaveBeenCalled()
  expect(cb2).not.toHaveBeenCalled()
})
