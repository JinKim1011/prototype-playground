const locks = new Map<string, Promise<void>>()

export async function withKeyedLock<T>(
  key: string,
  operation: () => Promise<T>
): Promise<T> {
  const previous = locks.get(key) ?? Promise.resolve()

  let release!: () => void
  const current = new Promise<void>((resolve) => {
    release = resolve
  })

  locks.set(key, current)

  await previous

  try {
    return await operation()
  } finally {
    release()

    if (locks.get(key) === current) {
      locks.delete(key)
    }
  }
}
