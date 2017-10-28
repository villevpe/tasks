import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Icon, Icons } from '../Icon/Icon'
import './Button.scss'

export interface ButtonProps {
    className: string
    label: string
    action: Function
    text?: string
    icon?: Icons.Props
}

type ConnectedButton = ButtonProps & DispatchProp<{}>

const ButtonComponent: React.SFC<ConnectedButton> = ({ text, className, label, action, icon, dispatch }) => {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            className={`btn ${className}`}
            onClick={() => dispatch(action())}
        >
            {icon ? <Icon {...icon} /> : null}
            {text ? <span>{text}</span> : null}
        </button>
    )
}
export const Button = connect()(ButtonComponent)
