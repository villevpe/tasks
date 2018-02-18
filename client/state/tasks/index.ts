import { Action as ReduxAction } from 'redux'
import taskReducer from './reducer'
import { addTask, toggleTask, deleteTask, deleteAllTasks } from './actions'

export namespace Tasks {

  export enum ActionTypes {
    AddTask = 'AddTask',
    RemoveTask = 'RemoveTask',
    RemoveAllTasks = 'RemoveAllTasks',
    ToggleTask = 'ToggleTask'
  }

  export interface Task {
    id?: string
    completed?: boolean
    text?: string
  }

  export type State = Tasks.Task[]

  export interface Action extends ReduxAction {
    type: Tasks.ActionTypes
    payload: Tasks.Task
  }

  export const Actions = {
    addTask,
    toggleTask,
    deleteTask,
    deleteAllTasks
  }

  export const Reducer = taskReducer
}
