import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import Task from './Task'
import { Tasks, Filters, Application } from '../../state'
import './index.scss'

export type TaskListDispatch = {
    onTaskClick: Function;
    onDeleteClick: Function;
}

export type TaskListState = {
    tasks: Tasks.State
}

const TaskList: React.SFC<TaskListState & TaskListDispatch> = ({ tasks, onTaskClick, onDeleteClick }) => (
    <ul>
        {tasks.map(task => (
            <Task
                key={task.id}
                onClick={() => onTaskClick(task.id)}
                onDeleteClick={() => onDeleteClick(task.id)}
                {...task}
            />
        ))}
    </ul>
)

const getVisibleTasks = (tasks: Tasks.State, filter: Filters.Types) => {
    switch (filter) {
        case Filters.Types.ShowCompleted:
            return tasks.filter((task) => task.completed)
        case Filters.Types.ShowActive:
            return tasks.filter((task) => !task.completed)
        default:
            return tasks
    }
}

const mapStateToProps = (state: Application.Store): TaskListState => ({
    tasks: getVisibleTasks(state.tasks, state.filters.filter)
})

const mapDispatchToProps = (dispatch: Dispatch<Tasks.Action>): TaskListDispatch => ({
    onTaskClick: (id: string) => dispatch(Tasks.Actions.toggleTask(id)),
    onDeleteClick: (id: string) => dispatch(Tasks.Actions.deleteTask(id))
})

export const VisibileTaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)
