import { Tasks } from './index'
import { addTask, toggleTask, deleteTask, deleteAllTasks } from './actions'

const isUUID = require('is-uuid')

describe('Task Actions', () => {

  let action: Tasks.Action = null

  describe('addTask', () => {
    const taskName = 'Test'

    beforeEach(() => action = addTask(taskName))

    it('should create an action to add a task', () => {
      expect(action.type).toEqual(Tasks.ActionTypes.AddTask)
      expect(action.payload.text).toEqual(taskName)
    })

    it('should creata a valid UUID (v4) for the action', () => {
      expect(isUUID.v4(action.payload.id)).toBeTruthy()
    })
  })

  describe('toggleTask', () => {
    const id = 'test-id'
    
    beforeEach(() => action = toggleTask(id))

    it('should create an action to toggle a task', () => {
      expect(action.type).toEqual(Tasks.ActionTypes.ToggleTask)
      expect(action.payload.id).toEqual(id)
    })
  })

  describe('deleteTask', () => {
    const id = 'test-id'

    beforeEach(() => action = deleteTask(id))

    it('should create an action to remove a task', () => {
      expect(action.type).toEqual(Tasks.ActionTypes.RemoveTask)
      expect(action.payload.id).toEqual(id)
    })
  })

  describe('deleteAllTasks', () => {
    
    beforeEach(() => action = deleteAllTasks())

    it('should create an action to remove all tasks', () => {
      expect(action.type).toEqual(Tasks.ActionTypes.RemoveAllTasks)
    })
  })

})
