import * as React from 'react';
import * as classNames from 'classnames';
import './index.scss';

interface TaskComponentProps {
    onClick: React.MouseEventHandler<HTMLLIElement>;
    completed?: boolean;
    text?: string;
}

const Task: React.SFC<TaskComponentProps> = ({ onClick, completed, text }) => {
    let classes = classNames({
        'item': true,
        'completed': completed
    });

    return (
        <li
            onClick={onClick}
            className={classes}
        >
            {text}
        </li>
    );
};

export default Task;