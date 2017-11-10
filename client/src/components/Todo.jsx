import React from 'react';

const calculateStyles = (props) => {
    const styles = {
        margin: 8,
        border: '1px solid rebeccapurple',
    };

    if (props.completed) {
        styles.textDecoration = 'line-through';
    }

    return styles;
}

const Todo = (props) => (
    <div
        style={calculateStyles(props)}
        onClick={() => props.onClick(props._id)}
        className='todo'
    >{props.title}</div>
);

export default Todo;