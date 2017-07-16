import * as React from 'react';
import { Dispatch, connect } from 'react-redux';
import { addTask, Actions } from '../../../actions';
import './index.scss';

interface AddTaskComponentProps {
    dispatch?: Dispatch<Actions.Task>;
}

let AddTaskComponent: React.StatelessComponent<AddTaskComponentProps> = ({ dispatch }) => {
    let input: HTMLTextAreaElement;

    return (
        <div className="add-task-container">
            <form
                onSubmit={e => handleSubmit(e)}
            >
                <textarea
                    placeholder="What needs to be done?"
                    ref={node => input = node}
                />
                <button className="btn add-task" type="submit">
                    Add
                </button>
            </form>
        </div>
    );

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!input.value.trim()) {
            return;
        }
        dispatch(addTask(input.value));
        input.value = '';
    }
};

export const AddTask: React.ComponentClass<AddTaskComponentProps> = connect()(AddTaskComponent);