import * as React from 'react';
import './index.scss';
import { connect, DispatchProp } from 'react-redux';

export interface ToggleModalProps {
    text: string;
    className: string;
    action: Function;
}

type ConnectedToggle = ToggleModalProps & DispatchProp<{}>;

const ToggleButton: React.SFC<ConnectedToggle> = ({ text, className, action, dispatch }) => {
    return (
        <button type="button" className={`btn ${className}`} onClick={() => dispatch(action())}>
            {text}
        </button>
    );
};

export const ToggleModal = connect()(ToggleButton);