import { Filters } from './index'

describe('Filter Actions', () => {
  let action: Filters.Action = null

  describe('setFilter', () => {
    const filter = Filters.Types.ShowCompleted

    beforeEach(() => action = Filters.Actions.setFilter(filter))

    it('should create an action to set the visibility filter of the list', () => {
      expect(action.type).toEqual(Filters.ActionTypes.SetFilter)
      expect(action.payload.filter).toEqual(filter)
    })
  })

})
