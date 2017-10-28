import reducer from './reducer'
import { Modal } from './index'

describe('Modal Reducer', () => {
  const initialValue: Modal.State = {
    modalType: null,
    modalProps: {
      header: null
    }
  }

  it('should use initial state as default value', () => {
    expect(reducer(undefined, { type: null })).toEqual(initialValue)
  })

  it('should set modalType to null with HideModal', () => {
    expect(reducer(initialValue, { type: Modal.ActionTypes.HideModal }).modalType).toEqual(null)
  })

  it('should return payload with ShowModal', () => {
    const state: Modal.State = {
      modalType: Modal.Types.AddTask,
      modalProps: { header: '' }
    }
    const action: Modal.Action = {
      type: Modal.ActionTypes.ShowModal,
      payload: state
    }
    expect(reducer(null, action)).toEqual(state)
  })
})
