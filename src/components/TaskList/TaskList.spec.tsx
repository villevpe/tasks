import * as React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { VisibileTaskList } from './index'
import { Provider } from 'react-redux'
import { Tasks, Filters } from '../../state'
import Task from './Task'

describe('<VisibleTaskList />', () => {
  const state = {
    tasks: [
      {
        id: 'a',
        completed: false,
        text: 'a'
      },
      {
        id: 'b',
        completed: false,
        text: 'b'
      },
      {
        id: 'c',
        completed: false,
        text: 'c'
      }
    ],
    filters: {
      filter: Filters.Types.ShowAll
    }
  }
  let { wrapper, store } = setup(state)

  it('should render a list of tasks', () => {
    expect(wrapper.find(Task).length).toBe(state.tasks.length)
  })

  it('should dispatch toggleTask with Task click', () => {
    const task = wrapper.find(Task).first()
    task.simulate('click')
    let actions = store.getActions()
    expect(actions.find(action => action.type === Tasks.ActionTypes.ToggleTask)).toBeTruthy()
  })
})

function setup(state: {}) {
  const store = configureStore()(state)
  return {
    wrapper: mount(<Provider store={store}><VisibileTaskList /></Provider>),
    store
  }
}
