import React from 'react';

const TaskItem = (props) => {
    return(
        <div>
            <span>{props.name} {props.description} {props.datecompl} {props.daterem}</span><input type="checkbox" />
        </div>
    )
};

export default TaskItem;