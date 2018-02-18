import * as React from 'react'
import * as classNames from 'classnames'
import { Icons, Icon } from '../../Icon/Icon'
import './Task.scss'

interface TaskComponentProps {
    onClick: React.MouseEventHandler<Element>
    onDeleteClick: React.MouseEventHandler<Element>
    completed?: boolean
    text?: string
}

const Task: React.SFC<TaskComponentProps> = ({ onClick, onDeleteClick, completed, text }) => {
    let classes = classNames({
        'item': true,
        'completed': completed
    })

    const renderDelete = completed ? (
        <button className="delete" onClick={onDeleteClick} aria-label="Delete task" title="Delete">
            <Icon name={Icons.Names.Delete} />
        </button>
    ) : null

    return (
        <li
            onClick={onClick}
            className={classes}
            aria-label={text}
        >
            <span className="label" aria-label={text}>
                {text}
            </span>
            {renderDelete}
        </li>
    )
}

export default Task
