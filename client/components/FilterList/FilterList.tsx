import React from 'react'
import { Filter } from './Filter/Filter'
import { Filters, Application } from '../../state'
import { connect } from 'react-redux'
import './FilterList.scss'

export const FilterListComponent: React.SFC<Filters.State> = (state) => {

    return (
        <div className={`filters ${state.open ? 'open' : 'closed'}`}>
            <Filter filter={Filters.Types.ShowActive} aria-label="Show active">
                Active
            </Filter>
            <Filter filter={Filters.Types.ShowCompleted} aria-label="Show completed">
                Completed
            </Filter>
        </div>
    )
}

export const FilterList = connect(
    (state: Application.Store) => state.filters
)(FilterListComponent)
