import * as React from 'react';
import { FilterLink } from './FilterLink';
import './index.scss';

const VisibilityFilter: React.SFC<{}> = () => (
    <div className="filters">
        <FilterLink filter="SHOW_ALL">
            All
        </FilterLink>
        <FilterLink filter="SHOW_ACTIVE">
            Active
        </FilterLink>
        <FilterLink filter="SHOW_COMPLETED">
            Completed
        </FilterLink>
    </div>
);

export default VisibilityFilter;