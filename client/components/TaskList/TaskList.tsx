import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import Task from './Task/Task'
import { Tasks, Filters, Application, Modal, Version } from '../../state'
import './TaskList.scss'

export type TaskListDispatch = {
    onTaskClick: Function
    onDeleteClick: Function
    onEditClick: Function
    onToggleClick: Function
}

export type TaskListState = {
    tasks: Tasks.State
}

type TaskListSFC = React.SFC<TaskListState & TaskListDispatch>

const TaskListComponent: TaskListSFC = ({ tasks, onTaskClick, onDeleteClick, onEditClick, onToggleClick }) => {
    return tasks.length === 0 ?
        (
            <div className="empty">
                <p>This list is empty</p>
            </div>
        ) : (
            <ul>
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        onClick={() => onTaskClick(task.id)}
                        onDeleteClick={() => onDeleteClick(task.id)}
                        onEditClick={() => onEditClick(task)}
                        onToggleClick={() => onToggleClick(task.id)}
                        {...task}
                    />
                ))}
            </ul>
        )
}

const getVisibleTasks = (tasks: Tasks.State, filter: Filters.Types) => {
    switch (filter) {
        case Filters.Types.ShowCompleted:
            return tasks.filter((task: Tasks.Task) => task.completed)
        case Filters.Types.ShowActive:
            return tasks.filter((task: Tasks.Task) => !task.completed)
        default:
            return tasks
    }
}

const mapStateToProps = (state: Application.Store): TaskListState => ({
    tasks: getVisibleTasks(state.tasks, state.filters.filter)
})

const mapDispatchToProps = (dispatch: Dispatch<Tasks.Action>): TaskListDispatch => ({
    onTaskClick: (id: string) => dispatch(Tasks.Actions.activateTask(id)),
    onDeleteClick: (id: string) => {
        dispatch(Version.Actions.updateVersion(new Date()))
        dispatch(Tasks.Actions.deleteTask(id))
    },
    onToggleClick: (id: string) => {
        dispatch(Version.Actions.updateVersion(new Date()))
        dispatch(Tasks.Actions.toggleTask(id))
    },
    onEditClick: (task: Tasks.Task) => dispatch(Modal.Actions.openEditModal(task)),
})

export const TaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListComponent)
