import { State } from '../reducers/index'
import { Action } from 'redux'
import * as uuid from 'uuid/v4'

export namespace Actions {

    export interface Task extends Action {
        type: ACTIONS.ADD_TASK | ACTIONS.TOGGLE_TASK | ACTIONS.REMOVE_TASK | ACTIONS.REMOVE_ALL_TASKS
        payload: State.Task
    }

    export interface VisibilityFilter extends Action {
        type: ACTIONS.SET_VISIBILITY_FILTER
        payload: {
            filter: string
        }
    }

    export interface Modal extends Action {
        type: MODAL_ACTIONS
        payload: State.Modal
    }
}

// todo: group enumns

export enum ACTIONS {
    ADD_TASK = 'ADD_TASK',
    TOGGLE_TASK = 'TOGGLE_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    REMOVE_ALL_TASKS = 'REMOVE_ALL_TASKS',
    SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER',
    OPEN_ADD_TASK_MODAL = 'OPEN_ADD_TASK_MODAL'
}

export enum FILTERS {
    SHOW_COMPLETED = 'SHOW_COMPLETED',
    SHOW_ALL = 'SHOW_ALL',
    SHOW_ACTIVE = 'SHOW_ACTIVE'
}

export enum MODAL_ACTIONS {
    SHOW_MODAL = 'SHOW_MODAL',
    HIDE_MODAL = 'HIDE_MODAL'
}

export enum MODAL_TYPES {
    ADD_TASK = 'ADD_TASK'
}

export const addTask = (text: string): Actions.Task => {
    return {
        type: ACTIONS.ADD_TASK,
        payload: {
            id: uuid(),
            completed: false,
            text: text
        }
    }
}

export const setVisibilityFilter = (filter: string): Actions.VisibilityFilter => {
    return {
        type: ACTIONS.SET_VISIBILITY_FILTER,
        payload: {
            filter: filter
        }
    }
}

export const toggleTask = (id: string): Actions.Task => {
    return {
        type: ACTIONS.TOGGLE_TASK,
        payload: {
            id: id
        }
    }
}

export const deleteTask = (id: string): Actions.Task => {
    return {
        type: ACTIONS.REMOVE_TASK,
        payload: {
            id: id
        }
    }
}

export const deleteAllTasks = (): Actions.Task => {
    return {
        type: ACTIONS.REMOVE_ALL_TASKS,
        payload: {}
    }
}

export const openAddTaskModal = (): Actions.Modal => {
    return {
        type: MODAL_ACTIONS.SHOW_MODAL,
        payload: {
            modalType: MODAL_TYPES.ADD_TASK,
            modalProps: {
                header: 'Add Task'
            }
        }
    }
}

export const closeModal = (): Actions.Modal => {
    return {
        type: MODAL_ACTIONS.SHOW_MODAL,
        payload: {
            modalType: null,
            modalProps: {
                header: null
            }
        }
    }
}