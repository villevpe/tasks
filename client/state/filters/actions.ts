import { Filters } from './index'

export const setFilter = (filter: Filters.Types): Filters.Action => ({
  type: Filters.ActionTypes.SetFilter,
  payload: { filter }
})

export const setListVisibility = (open: boolean): Filters.Action => ({
  type: Filters.ActionTypes.SetListVisibility,
  payload: { open }
})
