import * as React from 'react'
import * as classNames from 'classnames'
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
            <Icon name={Icons.Names.Complete} />
        </button>
    ) : null

    const revertButton = active && completed ? (
        <button className="action revert" onClick={onToggleClick} aria-label="Revert completion" title="Revert">
            <Icon name={Icons.Names.Revert} />
        </button>
    ) : null

    const editButton = active ? (
        <button className="action edit" onClick={onEditClick} aria-label="Edit task" title="Edit">
            <Icon name={Icons.Names.Edit} />
        </button>
    ) : null

    const deleteButton = active && completed ? (
        <button className="action delete" onClick={onDeleteClick} aria-label="Remove task" title="Remove">
            <Icon name={Icons.Names.Delete} />
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
