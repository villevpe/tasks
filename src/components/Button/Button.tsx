import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import './Button.scss'

export interface ButtonProps {
    text: string
    className: string
    action: Function
}

type ConnectedButton = ButtonProps & DispatchProp<{}>

const ButttonComponent: React.SFC<ConnectedButton> = ({ text, className, action, dispatch }) => {
    return (
        <button type="button" className={`btn ${className}`} onClick={() => dispatch(action())}>
            {text}
        </button>
    )
}

export const Button = connect()(ButttonComponent)
