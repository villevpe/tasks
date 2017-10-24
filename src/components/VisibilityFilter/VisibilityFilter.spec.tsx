import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import VisibilityFilter from './index'
import { FilterLink } from './FilterLink'

describe('<VisibleTaskList />', () => {
  let wrapper: ShallowWrapper

  beforeAll(() => {
    wrapper = shallow(<VisibilityFilter />)
  })

  it('should render three filter links', () => {
    expect(wrapper.find(FilterLink).length).toBe(3)
  })

})
