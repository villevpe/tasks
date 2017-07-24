import * as React from 'react';
import Task from './Task';
import { State } from '../../reducers';
import { connect } from 'react-redux';
import { toggleTask, deleteTask, FILTERS } from '../../actions';
import './index.scss';

export type TaskListDispatch = {
    onTaskClick: Function;
    onDeleteClick: Function;
};

export type TaskListState = {
    tasks: State.Task[];
};

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
);

const getVisibleTasks = (tasks: State.Tasks, filter: string) => {
    switch (filter) {
        case FILTERS.SHOW_COMPLETED:
            return tasks.filter((task: State.Task) => task.completed);
        case FILTERS.SHOW_ACTIVE:
            return tasks.filter((task: State.Task) => !task.completed);
        default:
            return tasks;
    }
};

const mapStateToProps = (state: State.Store): TaskListState => ({
    tasks: getVisibleTasks(state.tasks, state.visibilityFilter.filter)
});

const mapDispatchToProps = (dispatch: Function): TaskListDispatch => ({
    onTaskClick: (id: string) => dispatch(toggleTask(id)),
    onDeleteClick: (id: string) => dispatch(deleteTask(id))
});

export const VisibileTaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);