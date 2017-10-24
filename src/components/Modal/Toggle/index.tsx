import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import './index.scss'

export interface ActionButtonProps {
    text: string
    className: string
    action: Function
}

type ConnectedToggle = ActionButtonProps & DispatchProp<{}>

const ToggleButton: React.SFC<ConnectedToggle> = ({ text, className, action, dispatch }) => {
    return (
        <button type="button" className={`btn ${className}`} onClick={() => dispatch(action())}>
            {text}
        </button>
    )
}

export const ActionButton = connect()(ToggleButton)
