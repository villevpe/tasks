import * as React from 'react'
import { FilterList } from '../FilterList/FilterList'
import { TaskList } from '../TaskList/TaskList'
import { Modal } from '../Modal/Modal'
import { Button, ButtonProps } from '../Button/Button'
import { Modal as ModalState, Filters, Application } from '../../state/'
import { Icons } from '../Icon/Icon'
import { connect } from 'react-redux'
import './App.scss'

const addTaskButton: ButtonProps = {
    className: 'add-task',
    label: 'Add task',
    icon: {
        name: Icons.Names.Add,
        size: Icons.Sizes.Large
    },
    action: ModalState.Actions.openAddTaskModal
}

const AppComponent: React.SFC<Filters.State> = (filters) => {
    const filterButton: ButtonProps = {
        className: 'filter',
        label: 'Toggle filters',
        action: Filters.Actions.setListVisibility,
        icon: {
            name: Icons.Names.Filter,
            size: Icons.Sizes.Medium,
            color: filters.open ? Icons.Colors.White : Icons.Colors.Gray
        }
    }
    return (
        <div className="app">
            <Modal />
            <div className="app-container">
                <header>
                    <h1>Tasks</h1>
                    <Button {...filterButton} />
                </header>
                <FilterList />
                <TaskList />
                <Button {...addTaskButton} />
            </div>
        </div>
    )
}

export const App = connect(
    (state: Application.Store) => state.filters
)(AppComponent)
