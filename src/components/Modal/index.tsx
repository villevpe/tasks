import * as React from 'react';
import './index.scss';
import { AddTask } from './AddTask';
import { ToggleModal, ToggleModalProps } from './Toggle';
import { closeModal } from '../../actions';
import { connect } from 'react-redux';
import { State } from '../../reducers';

const ModalComponents = {
    'ADD_TASK': AddTask
};

const closeModalProps: ToggleModalProps = {
    className: 'close',
    text: '✕',
    action: closeModal
};

const ModalComponent: React.StatelessComponent<State.Modal> = ({ modalType, modalProps }) => {
    if (!modalType) {
        return null;
    }
    const Component = ModalComponents[modalType];
    const { header, ...otherProps } = modalProps;
    return Component ? (
        <div className="modal">
            <div className="inner">
                <div className="header">
                    <h3>{header}</h3>
                    <ToggleModal {...closeModalProps} />
                </div>
                <Component {...otherProps} />
            </div>
        </div>
    ) : null;
};

export const Modal = connect(
    (state: State.Store) => state.modal
)(ModalComponent);
