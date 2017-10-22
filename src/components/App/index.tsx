import * as React from 'react'
import VisibilityFilter from '../VisibilityFilter'
import { VisibileTaskList } from '../TaskList'
import { ModalView } from '../Modal'
import { ActionButton, ActionButtonProps } from '../Modal/Toggle'
import { Tasks, Modal } from '../../state/'
import './App.scss'

const modalProps: ActionButtonProps = {
    className: 'add-task',
    text: 'Add a task',
    action: Modal.Actions.openAddTaskModal
}

const clearAllProps: ActionButtonProps = {
    className: 'delete-all',
    text: 'Remove all tasks',
    action: Tasks.Actions.deleteAllTasks
}

const App = () => (
    <div className="app">
        <ModalView />
        <div className="app-container">
            <h1>Tasks</h1>
            <VisibilityFilter />
            <VisibileTaskList />
            <div className="actions">
                <ActionButton {...modalProps} />
                <ActionButton {...clearAllProps} />
            </div>
        </div>
    </div>
)

export default App
