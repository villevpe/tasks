import { ACTIONS, addTask, Actions } from './index'

const isUUID = require('is-uuid')

describe('actions', () => {

  describe('addTask', () => {
    const taskName = 'Test'
    let action: Actions.Task = null

    beforeEach(() => action = addTask(taskName))

    it('should create an action to add a task', () => {
      expect(action.type).toEqual(ACTIONS.ADD_TASK)
      expect(action.payload.text).toEqual(taskName)
    })

    it('should creata a valid UUID (v4) for the action', () => {
      expect(isUUID.v4(action.payload.id)).toBeTruthy()
    })
  })

})
