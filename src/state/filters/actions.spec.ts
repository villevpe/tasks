import { Filters } from './index'

describe('Filter Actions', () => {
  let action: Filters.Action = null

  describe('setVisibilityFilter', () => {
    const filter = Filters.Types.ShowAll

    beforeEach(() => action = Filters.Actions.setVisibilityFilter(filter))

    it('should create an action to set the visibility filter of the list', () => {
      expect(action.type).toEqual(Filters.ActionTypes.SetVisibilityFilter)
      expect(action.payload.filter).toEqual(filter)
    })
  })

})
