const debounce = require('debounce')
const SAVE_STATE_DEBOUNCE_MS = 100

/** 
 * Data storage wrapper, currently supports only localStorage
 */
export class Storage<T> {
  private key: string
  private interval: number
  private useLocalStorage: boolean

  constructor(storageKey: string, saveInterval: number = SAVE_STATE_DEBOUNCE_MS) {
    this.useLocalStorage = typeof window !== 'undefined' ? !!window.localStorage : false
    this.key = storageKey
    this.interval = saveInterval
  }

  public save(data: T) {
    if (this.useLocalStorage) {
      debounce(this.set.bind(this, data), this.interval)()
    }
  }

  public load(): T | {} {
    if (!this.useLocalStorage) {
      return {}
    }
    return this.hasData() ? this.get() : {}
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

  private hasData(): boolean {
    return !!localStorage.getItem(this.key)
  }

  private set(data: T) {
    if (!this.useLocalStorage) {
      return
    }
    try {
      localStorage.setItem(this.key, JSON.stringify(data))
    } catch (error) {
      console.error(`Saving failed: ${error.message}`, error)
    }
  }
}
