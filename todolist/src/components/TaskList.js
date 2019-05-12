import React from 'react';
import TaskItem from './TaskItem';

const TaskList = (props) => {
  return(
      <div>
          {props.tasks.map(c => <TaskItem key={c.id} name={c.name} datecompl={c.dateCompletion} daterem={c.dateReminder} listId={c.todoListId} />)}
      </div>
  )
};

export default TaskList;