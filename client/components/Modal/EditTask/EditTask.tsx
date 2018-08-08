import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { Tasks, Modal, Version } from '../../../state'
import './EditTask.scss'

interface EditTaskComponentProps {
    dispatch?: Dispatch<Tasks.Action>
    task?: Tasks.Task
}

let EditTaskComponent: React.SFC<EditTaskComponentProps> = ({ dispatch, task }) => {
    let input: HTMLTextAreaElement

    return (
        <div className="edit-task-container">
            <form
                onSubmit={e => handleSubmit(e)}
            >
                <textarea
                    autoFocus={true}
                    defaultValue={task.text}
                    ref={node => input = node}
                />
                <button className="btn submit" type="submit">
                    Save
                </button>
            </form>
        </div>
    )

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!input.value.trim()) {
            return
        }
        dispatch(Version.Actions.updateVersion(new Date()))
        dispatch(Tasks.Actions.changeTask(task.id, {
            ...task,
            text: input.value,
            active: false
        }))
        input.value = ''
        dispatch(Modal.Actions.closeModal())
    }
}

export const EditTask: React.ComponentClass<EditTaskComponentProps> = connect()(EditTaskComponent)
