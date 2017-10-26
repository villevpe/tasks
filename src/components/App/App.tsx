import * as React from 'react'
import { FilterList } from '../FilterList/FilterList'
import { TaskList } from '../TaskList/TaskList'
import { Modal } from '../Modal/Modal'
import { Button, ButtonProps } from '../Button/Button'
import { Tasks, Modal as ModalState } from '../../state/'
import './App.scss'

const modalProps: ButtonProps = {
    className: 'add-task',
    text: 'Add a task',
    action: ModalState.Actions.openAddTaskModal
}

const clearAllProps: ButtonProps = {
    className: 'delete-all',
    text: 'Remove all tasks',
    action: Tasks.Actions.deleteAllTasks
}

const App = () => (
    <div className="app">
        <Modal />
        <div className="app-container">
            <h1>Tasks</h1>
            <FilterList />
            <TaskList />
            <div className="actions">
                <Button {...modalProps} />
                <Button {...clearAllProps} />
            </div>
        </div>
    </div>
)

export default App
