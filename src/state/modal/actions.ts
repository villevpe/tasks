import { Modal } from './index'

export const openAddTaskModal = (): Modal.Action => {
  return {
      type: Modal.ActionTypes.ShowModal,
      payload: {
          modalType: Modal.Types.AddTask,
          modalProps: {
              header: 'Add Task'
          }
      }
  }
}

export const closeModal = (): Modal.Action => {
  return {
      type: Modal.ActionTypes.HideModal,
      payload: {
          modalType: null,
          modalProps: {
              header: null
          }
      }
  }
}
