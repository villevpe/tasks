import * as React from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { AddTask } from './AddTask'
import { ActionButton, ActionButtonProps } from './Toggle'
import { Application, Modal } from '../../state'

const ModalComponents = {
    [Modal.Types.AddTask]: AddTask
}

const closeModalProps: ActionButtonProps = {
    className: 'close',
    text: '✕',
    action: Modal.Actions.closeModal
}

const ModalComponent: React.StatelessComponent<Modal.State> = ({ modalType, modalProps }) => {
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
                    <ActionButton {...closeModalProps} />
                </div>
                <Component {...otherProps} />
            </div>
        </div>
    ) : null
}

export const ModalView = connect(
    (state: Application.Store) => state.modal
)(ModalComponent)
