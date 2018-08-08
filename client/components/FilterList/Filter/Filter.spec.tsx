import * as React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Filter } from './Filter'
import { Filters } from '../../../state'

describe('<VisibleTaskList />', () => {

  it('should render child node', () => {
    let { wrapper } = setup({ filters: { filter: Filters.Types.ShowCompleted } })
    expect(wrapper.find('button').text()).toEqual('Test')
  })

  describe('handleClick', () => {

    it('should dispatch setFilter when filter is not active', () => {
      let { wrapper, store } = setup({ filters: { filter: Filters.Types.ShowCompleted } })
      wrapper.find('button').simulate('click')
      const actions = store.getActions()
      expect(actions.find(action => action.type === Filters.ActionTypes.SetFilter)).toBeTruthy()
    })

    it('should call not dispatch setFilter when filter is active', () => {
      let { wrapper, store } = setup({ filters: { filter: Filters.Types.ShowActive } })
      store.clearActions()
      wrapper.find('button').simulate('click')
      const actions = store.getActions()
      expect(actions.find(action => action.type === Filters.ActionTypes.SetFilter)).toBeFalsy()
    })
  })
})

function setup(state: {}) {
  const store = configureStore()(state)
  return {
    wrapper: mount(
      <Provider store={store}>
        <Filter filter={Filters.Types.ShowActive}>
          Test
        </Filter>
      </Provider>
    ),
    store
  }
}
