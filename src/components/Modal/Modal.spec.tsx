import * as React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { ModalView } from './index'
import { Provider } from 'react-redux'
import { Modal } from '../../state/index'
import { AddTask } from './AddTask/'
import { ActionButton } from './Toggle/index'

describe('<ModalView />', () => {

  describe('with no type', () => {
    let { wrapper } = setup({ modalType: null })
    it('should not render anything if modalType is not supplied', () => {
      expect(wrapper.find('h3').length).toBe(0)
    })
  })

  describe('with addTask type', () => {
    let { wrapper } = setup({ modalType: Modal.Types.AddTask, modalProps: {header: ''} })

    it('should render AddTask component', () => {
      expect(wrapper.find(AddTask).length).toBe(1)
    })

    it('should render close button component', () => {
      expect(wrapper.find(ActionButton).length).toBe(1)
    })
  })

})

function setup(props: {}) {
  const store = configureStore()({modal: {}})
  return {
    wrapper: mount(<Provider store={store}><ModalView {...props} /></Provider>),
    store
  }
}
