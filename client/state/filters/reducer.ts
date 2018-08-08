import { Reducer } from 'redux'
import { Filters } from './index'

const reducer: Reducer<Filters.State> = (
    state = { filter: Filters.Types.ShowActive, open: true },
    action: Filters.Action
): Filters.State => {
    switch (action.type) {
        case Filters.ActionTypes.SetFilter:
            return {
                open: state.open,
                filter: action.payload.filter
            }
        case Filters.ActionTypes.SetListVisibility:
            return {
                open: determineOpenState(),
                filter: state.filter
            }
        default:
            return state
    }

    /**
     * If state is not provided, toggle the state, otherwise just set it
     */
    function determineOpenState() {
        const open = action.payload.open
        return open === undefined ? !state.open : open
    }
}

export default reducer
