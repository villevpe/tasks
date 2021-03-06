import { Storage } from './storage'

const MockStorage = new class {
  store = {}
  setItem = (key: string, val: string) => (this.store[key] = val)
  getItem = (key: string) => this.store[key]
  removeItem = (key: string) => { delete this.store[key] }
  clear = () => (this.store = {})
}()

describe('Storage', () => {
  Object.defineProperty(window, 'localStorage', {
    value: MockStorage,
    writable: true
  })
  const key = 'test'
  let _error: Console['error']
  let storage = new Storage<{}>(key)

  beforeAll(() => {
    _error = console.error
    console.error = () => false
  })

  describe('constructor', () => {
    const localStorage = window.localStorage

    it('no localStorage should not throw error', () => {
      Object.defineProperty(window, 'localStorage', {
        value: undefined
      })
      expect(() => new Storage<{}>(key)).not.toThrowError()
    })

    afterAll(() => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorage
      })
    })
  })

  describe('save', () => {

    beforeEach(() => {
      window.localStorage.clear()
    })

    it('should set value to localStorage after debounce', (done) => {
      spyOn(window.localStorage, 'setItem')
      const data = { data: 'd' }
      storage.save(data)
      setTimeout(expects, 1000)

      function expects() {
        expect(window.localStorage.setItem).toHaveBeenCalled()
        done()
      }
    })
  })

  describe('load', () => {
    it('should return saved data', (done) => {
      const data = { data: 'd' }
      storage.save(data)
      setTimeout(expects, 1000)

      function expects() {
        expect(storage.load()).toEqual(data)
        done()
      }
    })

    it('failure should return empty object', () => {
      window.localStorage.setItem(key, '{}')
      expect(storage.load()).toEqual({})
    })
  })
  afterAll(() => {
    console.error = _error
  })
})
