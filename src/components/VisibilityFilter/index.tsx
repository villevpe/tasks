import * as React from 'react'
import { FilterLink } from './FilterLink'
import { Filters } from '../../state'
import './index.scss'

const VisibilityFilter: React.SFC<{}> = () => (
    <div className="filters">
        <FilterLink filter={Filters.Types.ShowAll}>
            All
        </FilterLink>
        <FilterLink filter={Filters.Types.ShowActive}>
            Active
        </FilterLink>
        <FilterLink filter={Filters.Types.ShowCompleted}>
            Completed
        </FilterLink>
    </div>
)

export default VisibilityFilter
