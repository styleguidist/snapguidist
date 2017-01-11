export default function pubSubFactory() {
  const listeners = new Set()

  const listen = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const clearListeners = () => listeners.clear()

  const notify = (...args) => listeners.forEach(listener => listener(...args))

  return {
    clearListeners,
    listen,
    notify,
  }
}

