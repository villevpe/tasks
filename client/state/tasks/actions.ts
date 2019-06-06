
import uuid from 'uuid/v4'
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

export const activateTask = (id: string): Tasks.Action => ({
    type: Tasks.ActionTypes.ActivateTask,
    payload: { id }
})

export const deleteTask = (id: string): Tasks.Action => ({
    type: Tasks.ActionTypes.RemoveTask,
    payload: { id }
})

export const editTask = (id: string): Tasks.Action => ({
    type: Tasks.ActionTypes.EditTask,
    payload: { id }
})

export const changeTask = (id: string, props: Tasks.Task): Tasks.Action => ({
    type: Tasks.ActionTypes.ChangeTask,
    payload: { id, ...props }
})

export const deleteAllTasks = (): Tasks.Action => ({
    type: Tasks.ActionTypes.RemoveAllTasks,
    payload: {}
})

export const setAllTasks = (tasks: Tasks.Task[]): Tasks.Action => ({
    type: Tasks.ActionTypes.SetAllTasks,
    payload: {},
    fullState: tasks
})
