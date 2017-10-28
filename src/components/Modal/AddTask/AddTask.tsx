import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { Tasks, Modal } from '../../../state'
import './AddTask.scss'

interface AddTaskComponentProps {
    dispatch?: Dispatch<Tasks.Action>
}

let AddTaskComponent: React.SFC<AddTaskComponentProps> = ({ dispatch }) => {
    let input: HTMLTextAreaElement

    return (
        <div className="add-task-container">
            <form
                onSubmit={e => handleSubmit(e)}
            >
                <textarea
                    autoFocus={true}
                    placeholder="What needs to be done?"
                    ref={node => input = node}
                />
                <button className="btn submit" type="submit">
                    Add
                </button>
            </form>
        </div>
    )

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!input.value.trim()) {
            return
        }
        dispatch(Tasks.Actions.addTask(input.value))
        input.value = ''
        dispatch(Modal.Actions.closeModal())
    }
}

export const AddTask: React.ComponentClass<AddTaskComponentProps> = connect()(AddTaskComponent)
