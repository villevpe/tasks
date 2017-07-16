import * as React from 'react';
import Task from './Task';
import { State } from '../../reducers';
import { connect } from 'react-redux';
import { toggleTask, FILTERS } from '../../actions';
import './index.scss';

export type TaskListDispatch = {
    onTaskClick: Function;
};

export type TaskListState = {
    tasks: State.Task[];
};

const TaskList: React.SFC<TaskListState & TaskListDispatch> = ({ tasks, onTaskClick }) => (
    <ul>
        {tasks.map(task => (
            <Task 
                key={task.id}
                onClick={() => onTaskClick(task.id)}
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
    onTaskClick: (id: number) => dispatch(toggleTask(id))
});

export const VisibileTaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);