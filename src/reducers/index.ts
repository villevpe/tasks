import { combineReducers } from 'redux';
import tasks from './tasks';
import visibilityFilter from './visibilityFilter';
import modal from './modal';
import { MODAL_TYPES } from '../actions';

export namespace State {

    export interface Task {
        id: number;
        completed?: boolean;
        text?: string;
    }

    export interface Tasks extends Array<Task> { }

    export interface VisibilityFilter {
        filter: string;
    }

    export interface Modal {
        modalType: MODAL_TYPES;
        modalProps: {
            header: string
        };
    }

    export interface Store {
        visibilityFilter: State.VisibilityFilter;
        tasks: State.Tasks;
        modal: State.Modal;
    }
}

const reducer = combineReducers({
    tasks,
    visibilityFilter,
    modal
});

export default reducer;