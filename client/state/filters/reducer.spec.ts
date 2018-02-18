import reducer from './reducer'
import { Filters } from './index'

describe('Filters Reducer', () => {

  it('should use showAll as default value', () => {
    expect(reducer(undefined, { type: null })).toEqual({
      filter: Filters.Types.ShowAll,
      open: false
    })
  })

  it('should return payload for setFilter', () => {
    const state: Filters.State = { filter: Filters.Types.ShowAll }
    const action: Filters.Action = {
      type: Filters.ActionTypes.SetFilter,
      payload: state
    }
    expect(reducer(state, action)).toEqual(state)
  })
})
