import { ACTIONS, Actions, FILTERS } from '../actions';
import { Reducer } from 'redux';
import { State } from './index';

type VFState = State.VisibilityFilter;

const initialState: VFState = {
    filter: FILTERS.SHOW_ALL
};

const visibilityFilter: Reducer<{}> = (state: VFState = initialState, action: Actions.VisibilityFilter): VFState => {
    switch (action.type) {
        case ACTIONS.SET_VISIBILITY_FILTER:
            return action.payload;
        default:
            return state;
    }
};

export default visibilityFilter;