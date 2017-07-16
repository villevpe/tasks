import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../reducers/index';
import { setVisibilityFilter } from '../../../actions/index';
import * as classNames from 'classnames';

type FilterState = {
    active: boolean
};

type FilterDispatch = {
    onClick: Function;
};

type FilterLinkProps = FilterState & FilterDispatch & {
    children?: React.ReactNode;
};

const Link: React.SFC<FilterLinkProps> = ({ active, children, onClick }) => {
    const classes = classNames('btn filter', { 'active': active });

    return (
        <button
            type="button"
            className={classes}
            onClick={e => handleClick(e)}
        >
            {children}
        </button>
    );

    function handleClick(event: React.MouseEvent<{}>) {
        event.preventDefault();
        return active ? false : onClick();
    }
};

const mapStateToProps = (state: State.Store, ownProps: State.VisibilityFilter): FilterState => ({
    active: ownProps.filter === state.visibilityFilter.filter
});

const mapDispatchToProps = (dispatch: Function, ownProps: State.VisibilityFilter): FilterDispatch => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
});

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export { FilterLink };