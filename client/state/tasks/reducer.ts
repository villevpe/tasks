import { Reducer } from 'redux'
import { Tasks } from './index'
const initialState: Tasks.State = []

const reducer: Reducer<Tasks.State> = (state = initialState, action: Tasks.Action): Tasks.State => {
    switch (action.type) {
        case Tasks.ActionTypes.AddTask:
            return [
                ...state,
                {
                    id: action.payload.id,
                    text: action.payload.text,
                    completed: false,
                }
            ]
        case Tasks.ActionTypes.ActivateTask:
            return state
                .map(task => {
                    return (task.id === action.payload.id)
                        ? { ...task, active: !task.active }
                        : { ...task, active: false }
                })

        case Tasks.ActionTypes.ToggleTask:
            return state
                .map(task => (task.id === action.payload.id) ? { ...task, completed: !task.completed } : task)

        case Tasks.ActionTypes.RemoveTask:
            return state
                .filter(task => task.id !== action.payload.id)

        case Tasks.ActionTypes.EditTask:
            return state
                .map(task => (task.id === action.payload.id) ? { ...task, active: !task.active } : task)

        case Tasks.ActionTypes.ChangeTask:
            return state
                .map(task => (task.id === action.payload.id) ? { ...action.payload } : task)

        case Tasks.ActionTypes.RemoveAllTasks:
            return initialState

        case Tasks.ActionTypes.SetAllTasks:
            return action.fullState

        default:
            return state
    }
}

export default reducer
