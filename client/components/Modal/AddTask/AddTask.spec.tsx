import * as React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { AddTask } from './AddTask'
import { Provider } from 'react-redux'
import { Tasks, Modal } from '../../../state/index'
import { Action } from 'redux-actions'

describe('<AddTask />', () => {
  let { wrapper, store } = setup()

  it('should render textarea and a submit button', () => {
    expect(wrapper.find('button').length).toBe(1)
    expect(wrapper.find('textarea').length).toBe(1)
  })

  describe('handleSubmit', () => {
    const testTask = 'Test'
    let actions: Action<{}>[]

    beforeAll(() => {
      valueOfTextArea(testTask)
      wrapper.find('button').simulate('submit')
      actions = store.getActions()
    })
    it('should dispatch addTask action with input value', () => {
      const add = actions.find(action => action.type === Tasks.ActionTypes.AddTask)
      const payload: Tasks.Task = add.payload
      expect(payload.text).toEqual(testTask)
    })

    it('should dispatch closeModal action', () => {
      expect(actions.find(action => action.type === Modal.ActionTypes.HideModal)).toBeTruthy()
    })

    it('should clear input value', () => {
      expect(valueOfTextArea()).toEqual('')
    })

    function valueOfTextArea(value?: string) {
      const element = wrapper.find('textarea').getDOMNode() as HTMLTextAreaElement
      if (value) {
        element.value = testTask
      }
      return element.value
    }
  })

})

function setup() {
  const store = configureStore()({})
  return {
    wrapper: mount(<Provider store={store}><AddTask /></Provider>),
    store
  }
}
