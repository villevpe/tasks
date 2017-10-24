import { Filters } from './index'

export const setVisibilityFilter = (filter: Filters.Types): Filters.Action => ({
  type: Filters.ActionTypes.SetVisibilityFilter,
  payload: { filter }
})
