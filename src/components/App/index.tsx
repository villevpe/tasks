import * as React from 'react';
import VisibilityFilter from '../VisibilityFilter';
import { VisibileTaskList } from '../TaskList';
import { Modal } from '../Modal';
import { ActionButton, ActionButtonProps } from '../Modal/Toggle';
import { openAddTaskModal, deleteAllTasks } from '../../actions';
import './index.scss';

const modalProps: ActionButtonProps = {
    className: 'add-task',
    text: 'Add a task',
    action: openAddTaskModal
};

const clearAllProps: ActionButtonProps = {
    className: 'delete-all',
    text: 'Remove all tasks',
    action: deleteAllTasks
};

const App = () => (
    <div className="app">
        <Modal />
        <div className="app-container">
            <h1>Your Tasks</h1>
            <VisibilityFilter />
            <VisibileTaskList />
            <div className="actions">
                <ActionButton {...modalProps} />
                <ActionButton {...clearAllProps} />
            </div>
        </div>
    </div>
);

export default App;