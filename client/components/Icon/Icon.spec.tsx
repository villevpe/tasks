import * as React from 'react'
import { shallow } from 'enzyme'
import { Icon, Icons } from './Icon'

describe('<Icon />', () => {
  const props: Icons.Props = {
    name: Icons.Name.Add
  }
  const wrapper = shallow(<Icon {...props} />)

  it('should render svg based on the provided name', () => {
    expect(wrapper.find('svg').length).toBe(1)
  })

})
