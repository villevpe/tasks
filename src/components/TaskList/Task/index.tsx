import * as React from 'react';
import * as classNames from 'classnames';
import './index.scss';

interface TaskComponentProps {
    onClick: React.MouseEventHandler<HTMLLIElement>;
    onDeleteClick: React.MouseEventHandler<HTMLLIElement>;
    completed?: boolean;
    text?: string;
}

const Task: React.SFC<TaskComponentProps> = ({ onClick, onDeleteClick, completed, text }) => {
    let classes = classNames({
        'item': true,
        'completed': completed
    });

    return (
        <li
            onClick={onClick}
            className={classes}
        >
            <span className="label">
                {text}
            </span>
            {completed ?
                <span className="delete" onClick={onDeleteClick}>
                    x
                </span>
            : ''}
        </li>
    );
};

export default Task;