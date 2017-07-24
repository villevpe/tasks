import * as React from 'react';
import './index.scss';
import { connect, DispatchProp } from 'react-redux';

export interface ActionButtonProps {
    text: string;
    className: string;
    action: Function;
}

type ConnectedToggle = ActionButtonProps & DispatchProp<{}>;

const ToggleButton: React.SFC<ConnectedToggle> = ({ text, className, action, dispatch }) => {
    return (
        <button type="button" className={`btn ${className}`} onClick={() => dispatch(action())}>
            {text}
        </button>
    );
};

export const ActionButton = connect()(ToggleButton);