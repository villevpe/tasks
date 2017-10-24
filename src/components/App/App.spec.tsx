import * as React from 'react'
import { shallow } from 'enzyme'
import App from './index'
import { VisibileTaskList } from '../TaskList'
import { ActionButton } from '../Modal/Toggle'

describe('<App />', () => {
  const wrapper = shallow(<App />)

  it('should render tasklist', () => {
    expect(wrapper.find(VisibileTaskList).length).toBe(1)
  })

  it('should render actions', () => {
    expect(wrapper.find(ActionButton).length).toBe(2)
  })

  it('should render header', () => {
    expect(wrapper.find('h1').length).toBe(1)
  })
})
