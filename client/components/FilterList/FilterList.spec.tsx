import * as React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { FilterList } from './FilterList'
import { Filter } from './Filter/Filter'

describe('<VisibleTaskList />', () => {
  let { wrapper } = setup()
  
  it('should render three filter links', () => {
    expect(wrapper.find(Filter).length).toBe(3)
  })

})

function setup() {
  const store = configureStore()({ filters: { open: true } })
  return {
    wrapper: mount(<Provider store={store}><FilterList /></Provider>),
    store
  }
}
