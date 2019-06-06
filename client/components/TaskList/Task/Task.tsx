import React from 'react'
import classNames from 'classnames'
import { Icons, Icon } from '../../Icon/Icon'
import './Task.scss'
import { Tasks } from '../../../state'

interface TaskComponentProps extends Tasks.Task {
    onClick: React.MouseEventHandler<Element>
    onDeleteClick: React.MouseEventHandler<Element>
    onEditClick: React.MouseEventHandler<Element>
    onToggleClick: React.MouseEventHandler<Element>
}

type TaskSFC = React.SFC<TaskComponentProps>

const Task: TaskSFC = ({ onClick, onToggleClick, onDeleteClick, onEditClick, active, text, completed }) => {
    let classes = classNames({
        'item': true,
        'active': active
    })

    const completeButton = active && !completed ? (
        <button className="action complete" onClick={onToggleClick} aria-label="Complete task" title="Complete">
            <Icon name={Icons.Name.Complete} />
        </button>
    ) : null

    const revertButton = active && completed ? (
        <button className="action revert" onClick={onToggleClick} aria-label="Revert completion" title="Revert">
            <Icon name={Icons.Name.Revert} />
        </button>
    ) : null

    const editButton = active ? (
        <button className="action edit" onClick={onEditClick} aria-label="Edit task" title="Edit">
            <Icon name={Icons.Name.Edit} />
        </button>
    ) : null

    const deleteButton = active && completed ? (
        <button className="action delete" onClick={onDeleteClick} aria-label="Remove task" title="Remove">
            <Icon name={Icons.Name.Delete} />
        </button>
    ) : null

    return (
        <li className={classes} aria-label={text}  >
            <span
                className="label"
                aria-label={text}
                onClick={onClick}
            >
                {text}
            </span>
            {editButton}
            {completeButton}
            {revertButton}
            {deleteButton}
        </li>
    )
}

export default Task
