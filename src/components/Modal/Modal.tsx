import * as React from 'react'
import { connect } from 'react-redux'
import { AddTask } from './AddTask/AddTask'
import { Button, ButtonProps } from '../Button/Button'
import { Application, Modal as Model } from '../../state'
import './Modal.scss'

const ModalComponents = {
    [Model.Types.AddTask]: AddTask
}

const closeModalProps: ButtonProps = {
    className: 'close',
    text: '✕',
    action: Model.Actions.closeModal
}

const ModalComponent: React.StatelessComponent<Model.State> = ({ modalType, modalProps }) => {
    if (!modalType) {
        return null
    }
    const Component = ModalComponents[modalType]
    const { header, ...otherProps } = modalProps
    return Component ? (
        <div className="modal">
            <div className="inner">
                <div className="header">
                    <h3>{header}</h3>
                    <Button {...closeModalProps} />
                </div>
                <Component {...otherProps} />
            </div>
        </div>
    ) : null
}

export const Modal = connect(
    (state: Application.Store) => state.modal
)(ModalComponent)
