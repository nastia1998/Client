import React from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => {
    return (
        <div>
            {props.todolists.map(c => <TodoItem key={c.id} name={c.name} description={c.description} />)}
        </div>
    )
};

export default TodoList;