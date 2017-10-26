import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { FilterList } from './FilterList'
import { Filter } from './Filter/Filter'

describe('<VisibleTaskList />', () => {
  let wrapper: ShallowWrapper

  beforeAll(() => {
    wrapper = shallow(<FilterList />)
  })

  it('should render three filter links', () => {
    expect(wrapper.find(Filter).length).toBe(3)
  })

})
