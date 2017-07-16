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
        default:
            return state;
    }
};

export default tasks;