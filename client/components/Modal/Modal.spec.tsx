import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Modal as ModalState } from '../../state'
import { Modal } from './Modal'
import { AddTask } from './AddTask/AddTask'
import { Button } from '../Button/Button'

describe('<ModalView />', () => {

  describe('with no type', () => {
    let { wrapper } = setup({ modalType: null })
    it('should not render anything if modalType is not supplied', () => {
      expect(wrapper.find('h3').length).toBe(0)
    })
  })

  describe('with addTask type', () => {
    let { wrapper } = setup({ modalType: ModalState.Types.AddTask, modalProps: {header: ''} })

    it('should render AddTask component', () => {
      expect(wrapper.find(AddTask).length).toBe(1)
    })

    it('should render close button component', () => {
      expect(wrapper.find(Button).length).toBe(1)
    })
  })

})

function setup(props: {}) {
  const store = configureStore()({modal: {}})
  return {
    wrapper: mount(<Provider store={store}><Modal {...props} /></Provider>),
    store
  }
}
