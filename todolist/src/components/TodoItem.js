import React from 'react';

const TodoItem = (props) => {
  return (
      <div>
          <span>{props.name} {props.description} {props.listId}</span>
      </div>
  )
};

export default TodoItem;