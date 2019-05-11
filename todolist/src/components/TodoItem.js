import React from 'react';

const TodoItem = (props) => {
  return (
      <div>
          <span>{props.name} {props.description}</span>
      </div>
  )
};

export default TodoItem;