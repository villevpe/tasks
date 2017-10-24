import * as React from 'react'
import { connect } from 'react-redux'
import * as classNames from 'classnames'
import { Filters, Application } from '../../../state/'

type FilterState = {
    active: boolean
}

type FilterDispatch = {
    onClick: Function
}

type FilterLinkProps = FilterState & FilterDispatch & { children?: React.ReactNode }

const Link: React.SFC<FilterLinkProps> = ({ active, children, onClick }) => {
    const classes = classNames('btn filter', { 'active': active })

    return (
        <button
            type="button"
            className={classes}
            onClick={e => handleClick(e)}
        >
            {children}
        </button>
    )

    function handleClick(event: React.MouseEvent<{}>) {
        event.preventDefault()
        return active ? false : onClick()
    }
}

const mapStateToProps = (state: Application.Store, ownProps: Filters.State): FilterState => ({
    active: ownProps.filter === state.filters.filter
})

const mapDispatchToProps = (dispatch: Function, ownProps: Filters.State): FilterDispatch => ({
    onClick: () => dispatch(Filters.Actions.setVisibilityFilter(ownProps.filter))
})

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export { FilterLink }
