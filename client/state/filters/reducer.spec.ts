import reducer from './reducer'
import { Filters } from './index'

describe('Filters Reducer', () => {

  it('should use ShowCompleted as default value', () => {
    expect(reducer(undefined, { type: null })).toEqual({
      filter: Filters.Types.ShowActive,
      open: true
    })
  })

  it('should return payload for setFilter', () => {
    const state: Filters.State = { filter: Filters.Types.ShowActive }
    const action: Filters.Action = {
      type: Filters.ActionTypes.SetFilter,
      payload: state
    }
    expect(reducer(state, action)).toEqual(state)
  })
})
