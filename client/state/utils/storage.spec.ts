import { Storage } from './storage'

describe('Storage', () => {
  const key = 'test'
  let _error: Console['error']
  let storage = new Storage<{}>(key)

  beforeAll(() => {
    _error = console.error
    console.error = () => false
  })

  describe('constructor', () => {
    const localStorage = window.localStorage

    it('no localStorage should throw error', () => {
      Object.defineProperty(window, 'localStorage', {
        value: undefined
      })
      expect(() => new Storage<{}>(key)).toThrowError()
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
      window.localStorage.__STORE__[key] = {}
      expect(storage.load()).toEqual({})
    })
  })
  afterAll(() => {
    console.error = _error
  })
})
