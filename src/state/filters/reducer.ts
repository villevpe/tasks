import { Reducer } from 'redux'
import { Filters } from './index'

const reducer: Reducer<Filters.State> = (state, action: Filters.Action): Filters.State => {
  if (!state) {
    state = {
      filter: Filters.Types.ShowAll
    }
  }
  switch (action.type) {
    case Filters.ActionTypes.SetVisibilityFilter:
      return action.payload
    default:
      return state
  }
}

export default reducer
