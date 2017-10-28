const debounce = require('debounce')
const SAVE_STATE_DEBOUNCE_MS = 100

export class Storage<T> {
  private key: string
  private interval: number

  constructor(storageKey: string, saveInterval: number = SAVE_STATE_DEBOUNCE_MS) {
    if (!window.localStorage) {
      throw new Error('Storage initialization failed, no support for localStorage')
    }
    this.key = storageKey
    this.interval = saveInterval
  }

  public save(data: T) {
    debounce(this.set.bind(this, data), this.interval)()
  }

  public load(): T | {} {
    return this.has() ? this.get() : {}
  }

  private get(): T | {} {
    try {
      const data = localStorage.getItem(this.key)
      return JSON.parse(data)
    } catch (error) {
      console.error(`Loading failed: ${error.message}`, error)
      return {}
    }
  }

  private has(): boolean {
    return !!localStorage.getItem(this.key)
  }

  private set(data: T) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data))
    } catch (error) {
      console.error(`Saving failed: ${error.message}`, error)
    }
  }
}
