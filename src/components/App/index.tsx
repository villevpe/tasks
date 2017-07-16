import * as React from 'react';
import VisibilityFilter from '../VisibilityFilter';
import { VisibileTaskList } from '../TaskList';
import { Modal } from '../Modal';
import { ToggleModal, ToggleModalProps } from '../Modal/Toggle';
import { openAddTaskModal } from '../../actions';
import './index.scss';

const modalProps: ToggleModalProps = {
    className: 'add-task',
    text: 'Add a task',
    action: openAddTaskModal
};

const App = () => (
    <div className="app">
        <Modal />
        <div className="app-container">
            <h1>Your Tasks</h1>
            <VisibilityFilter />
            <VisibileTaskList />
            <ToggleModal {...modalProps} />
        </div>
    </div>
);

export default App;