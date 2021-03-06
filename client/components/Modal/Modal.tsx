import React from 'react'
import { connect } from 'react-redux'
import { AddTask } from './AddTask/AddTask'
import { EditTask } from './EditTask/EditTask'
import { Button, ButtonProps } from '../Button/Button'
import { Application, Modal as ModalState } from '../../state'
import { OutsideClick, OutsideClickProps } from './OutsideClick'
import { store } from '../../state/store'
import './Modal.scss'

const ModalComponents = {
    [ModalState.Types.AddTask]: AddTask,
    [ModalState.Types.EditTask]: EditTask
}

const closeModalProps: ButtonProps = {
    className: 'close',
    label: 'Close',
    text: '✕',
    action: ModalState.Actions.closeModal
}

const clickOutsideProps: OutsideClickProps = {
    onOutsideClick: (event) => store.dispatch(ModalState.Actions.closeModal())
}

const ModalComponent: React.SFC<ModalState.State> = ({ modalType, modalProps }) => {
    if (!modalType) {
        return null
    }
    const Component = ModalComponents[modalType]
    const { header, task } = modalProps
    return Component ? (
        <div className="modal">
            <OutsideClick {...clickOutsideProps}>
                <div className="inner">
                    <div className="header">
                        <h3>{header}</h3>
                        <Button {...closeModalProps} />
                    </div>
                    <Component task={task} />
                </div>
            </OutsideClick>
        </div>
    ) : null
}

export const Modal = connect(
    (state: Application.Store) => state.modal
)(ModalComponent)
