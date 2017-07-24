import { ACTIONS, Actions } from '../actions';
import { State } from './index';
import { Reducer } from 'redux';

const initialState: State.Tasks = [];

const tasks: Reducer<{}> = (state: State.Tasks = initialState, action: Actions.Task): State.Tasks => {
    switch (action.type) {
        case ACTIONS.ADD_TASK:
            return [
                ...state,
                {
                    id: action.payload.id,
                    text: action.payload.text,
                    completed: false,
                }
            ];
        case ACTIONS.TOGGLE_TASK:
            return state.map(task => (task.id === action.payload.id) ? { ...task, completed: !task.completed } : task);
        case ACTIONS.REMOVE_TASK:
            return state.filter(task => task.id !== action.payload.id);
        case ACTIONS.REMOVE_ALL_TASKS:
            return initialState;
        default:
            return state;
    }
};

export default tasks;