import * as React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Button, ButtonProps } from './Button'
import { Provider } from 'react-redux'

describe('<ActionButton />', () => {
  const text = 'test'
  const label = 'test'
  const className = 'test-btn'
  const payload = { type: 'test' }

  let { wrapper, store } = setup({ className, text, label, action: () => payload })

  it('should show the provided text', () => {
    expect(wrapper.find('button').text()).toEqual(text)
  })

  it('should set the provided class name', () => {
    expect(wrapper.find('button').hasClass(className)).toBe(true)
  })

  it('should call dispatch with action in button click', () => {
    wrapper.find('button').simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([{ type: 'test' }])
  })
})

function setup(props: ButtonProps) {
  const store = configureStore()({})
  return {
    wrapper: mount(<Provider store={store}><Button {...props} /></Provider>),
    store
  }
}
