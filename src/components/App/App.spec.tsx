import * as React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { TaskList } from '../TaskList/TaskList'
import { Button } from '../Button/Button'

describe('<App />', () => {
  const wrapper = shallow(<App />)

  it('should render tasklist', () => {
    expect(wrapper.find(TaskList).length).toBe(1)
  })

  it('should render actions', () => {
    expect(wrapper.find(Button).length).toBe(1)
  })

  it('should render header', () => {
    expect(wrapper.find('h1').length).toBe(1)
  })
})
