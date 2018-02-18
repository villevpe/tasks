import * as uuid from 'uuid/v4'
import { Tasks } from './index'

export const addTask = (text: string): Tasks.Action => {
  return {
    type: Tasks.ActionTypes.AddTask,
    payload: {
      id: uuid(),
      completed: false,
      text
    }
  }
}

export const toggleTask = (id: string): Tasks.Action => ({
  type: Tasks.ActionTypes.ToggleTask,
  payload: { id }
})

export const deleteTask = (id: string): Tasks.Action => ({
  type: Tasks.ActionTypes.RemoveTask,
  payload: { id }
})

export const deleteAllTasks = (): Tasks.Action => ({
  type: Tasks.ActionTypes.RemoveAllTasks,
  payload: {}
})
