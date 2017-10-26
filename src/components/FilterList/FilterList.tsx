import * as React from 'react'
import { Filter } from './Filter/Filter'
import { Filters } from '../../state'
import './FilterList.scss'

export const FilterList: React.SFC<{}> = () => (
    <div className="filters">
        <Filter filter={Filters.Types.ShowAll}>
            All
        </Filter>
        <Filter filter={Filters.Types.ShowActive}>
            Active
        </Filter>
        <Filter filter={Filters.Types.ShowCompleted}>
            Completed
        </Filter>
    </div>
)
