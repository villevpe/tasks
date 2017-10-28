import * as React from 'react'
import { FilterList } from '../FilterList/FilterList'
import { TaskList } from '../TaskList/TaskList'
import { Modal } from '../Modal/Modal'
import { Button, ButtonProps } from '../Button/Button'
import { Modal as ModalState } from '../../state/'
import './App.scss'

const modalProps: ButtonProps = {
    className: 'add-task',
    text: '+',
    action: ModalState.Actions.openAddTaskModal
}

const App = () => (
    <div className="app">
        <Modal />
        <div className="app-container">
            <h1>Tasks</h1>
            <FilterList />
            <TaskList />
            <Button {...modalProps} />
        </div>
    </div>
)

export default App