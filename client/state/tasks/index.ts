import { Action as ReduxAction } from 'redux'
import taskReducer from './reducer'
import { 
    addTask, 
    changeTask, 
    toggleTask, 
    deleteTask, 
    editTask, 
    deleteAllTasks, 
    activateTask, 
    setAllTasks 
} from './actions'

export namespace Tasks {

  export enum ActionTypes {
    ActivateTask = 'ActivateTask',
    AddTask = 'AddTask',
    ChangeTask = 'ChangeTask',
    RemoveTask = 'RemoveTask',
    EditTask = 'EditTask',
    RemoveAllTasks = 'RemoveAllTasks',
    ToggleTask = 'ToggleTask',
    SetAllTasks = 'SetAllTasks'
  }

  export interface Task {
    id?: string
    completed?: boolean
    active?: boolean
    text?: string
  }

  export type State = Tasks.Task[]

  export interface Action extends ReduxAction {
    type: Tasks.ActionTypes
    payload: Tasks.Task,
    fullState?: Tasks.Task[]
  }

  export const Actions = {
    activateTask,
    addTask,
    changeTask,
    toggleTask,
    editTask,
    deleteTask,
    deleteAllTasks,
    setAllTasks
  }

  export const Reducer = taskReducer
}
