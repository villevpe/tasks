import { Modal } from './index'
import { openAddTaskModal, closeModal } from './actions'

describe('Modal Actions', () => {
  let action: Modal.Action = null

  describe('openAddTaskModal', () => {

    beforeEach(() => action = openAddTaskModal())

    it('should create an action to open the task modal', () => {
      expect(action.type).toEqual(Modal.ActionTypes.ShowModal)
      expect(action.payload.modalType).toEqual(Modal.Types.AddTask)
    })

    it('action payload should include the modal header', () => {
      expect(action.payload.modalProps.header).toBeDefined()
    })
  })

  describe('closeModal', () => {

    beforeEach(() => action = closeModal())

    it('should create an action to close the modal', () => {
      expect(action.type).toEqual(Modal.ActionTypes.HideModal)
      expect(action.payload.modalType).toEqual(null)
      expect(action.payload.modalProps.header).toEqual(null)
    })
  })
})
