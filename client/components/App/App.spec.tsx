import * as React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { App } from './App'
import { TaskList } from '../TaskList/TaskList'
import { Button } from '../Button/Button'
import { Application } from '../../state'

describe('<App />', () => {
  let { wrapper } = setup()

  it('should render TaskList component', () => {
    expect(wrapper.find(TaskList).length).toBe(1)
  })

  it('should render Button components', () => {
    expect(wrapper.find(Button).length).toBe(3)
  })

  it('should render header', () => {
    expect(wrapper.find('h1').length).toBe(1)
  })
})

function setup() {
  const state: Application.Store = {
    filters: { open: false },
    modal: {
      modalType: null,
      modalProps: {
        header: null
      }
    },
    tasks: [],
    auth: {
        isAuthenticated: false
    },
    version: {
        modifiedDate: null
    }
  }
  const store = configureStore()(state)
  return {
    wrapper: mount(<Provider store={store}><App /></Provider>),
    store
  }
}
