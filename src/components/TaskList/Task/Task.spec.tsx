import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Task from './index'

describe('<VisibleTaskList />', () => {
  let wrapper: ShallowWrapper
  const onDeleteSpy = jasmine.createSpy('onDeleteSpy')
  const text = 'test'
  
  beforeAll(() => {
    const props = {
      onClick: () => false,
      onDeleteClick: onDeleteSpy,
      completed: true,
      text
    }
    wrapper = shallow(<Task {...props} />)
  })

  it('should set task text', () => {
    expect(wrapper.find('.label').text()).toBe(text)
  })

  it('should show delete button when task is completed', () => {
    expect(wrapper.find('.delete').length).toBe(1)
  })

  it('should call onDeleteClick with .delete click', () => {
    wrapper.find('.delete').simulate('click')
    expect(onDeleteSpy).toHaveBeenCalled()
  })

})
