import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Icon, Icons } from '../Icon/Icon'
import './Button.scss'

export interface ButtonProps {
    className: string
    label: string
    action: Function
    text?: string
    icon?: Icons.Props
    useDispatch?: boolean
}

type ConnectedButton = ButtonProps & DispatchProp<{}>

const ButtonComponent: React.SFC<ConnectedButton> = (props) => {
    const { text, className, label, action, icon, dispatch, useDispatch = true } = props
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            className={`btn ${className}`}
            onClick={() => useDispatch ? dispatch(action()) : action()}
        >
            {icon ? <Icon {...icon} /> : null}
            {text ? <span>{text}</span> : null}
        </button>
    )
}
export const Button = connect()(ButtonComponent)
