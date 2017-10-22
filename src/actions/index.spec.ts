import {
  ACTIONS,
  Actions,
  MODAL_TYPES,
  MODAL_ACTIONS,
  addTask,
  toggleTask,
  deleteTask,
  openAddTaskModal,
  closeModal,
  deleteAllTasks,
  setVisibilityFilter
} from './index'

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

  describe('toggleTask', () => {
    const id = 'test-id'
    let action: Actions.Task = null

    beforeEach(() => action = toggleTask(id))

    it('should create an action to toggle a task', () => {
      expect(action.type).toEqual(ACTIONS.TOGGLE_TASK)
      expect(action.payload.id).toEqual(id)
    })
  })

  describe('deleteTask', () => {
    const id = 'test-id'
    let action: Actions.Task = null

    beforeEach(() => action = deleteTask(id))

    it('should create an action to remove a task', () => {
      expect(action.type).toEqual(ACTIONS.REMOVE_TASK)
      expect(action.payload.id).toEqual(id)
    })
  })

  describe('deleteAllTasks', () => {
    let action: Actions.Task = null

    beforeEach(() => action = deleteAllTasks())

    it('should create an action to remove all tasks', () => {
      expect(action.type).toEqual(ACTIONS.REMOVE_ALL_TASKS)
    })
  })

  describe('setVisibilityFilter', () => {
    const filter: string = 'test'
    let action: Actions.VisibilityFilter = null

    beforeEach(() => action = setVisibilityFilter(filter))

    it('should create an action to remove a task', () => {
      expect(action.type).toEqual(ACTIONS.SET_VISIBILITY_FILTER)
      expect(action.payload.filter).toEqual(filter)
    })
  })

  describe('openAddTaskModal', () => {
    let action: Actions.Modal = null

    beforeEach(() => action = openAddTaskModal())

    it('should create an action to open the task modal', () => {
      expect(action.type).toEqual(MODAL_ACTIONS.SHOW_MODAL)
      expect(action.payload.modalType).toEqual(MODAL_TYPES.ADD_TASK)
    })

    it('action payload should include the modal header', () => {
      expect(action.payload.modalProps.header).toBeDefined()
    })
  })

  describe('closeModal', () => {
    let action: Actions.Modal = null

    beforeEach(() => action = closeModal())

    it('should create an action to close the modal', () => {
      expect(action.type).toEqual(MODAL_ACTIONS.SHOW_MODAL)
      expect(action.payload.modalType).toEqual(null)
      expect(action.payload.modalProps.header).toEqual(null)
    })
  })

})
