import React from 'react';
import EditButton from './EditButton'
import { useState } from 'react';

function Task({ task, tasks, toggleTask, removeTask }) {
  const [flag, setFlag] = useState(true);

  const checkFlag = (flag) => {
    setFlag(flag);
  }

  const undoTask = (e) => {
    const todo = e.target.parentElement.parentElement.parentElement.parentElement;
    todo.children[0].children[0].children[0].value = task.task;
    checkFlag(true);
  }

  return (
    <div className="Task-text" key={task.id}>
      <form>
        <div className="input-group">
          <textarea className="form-control"
                    style={task.isCheck ? {textDecorationLine: 'line-through'} : {}}
                    defaultValue={task.task}
                    disabled={flag}
                    >
          </textarea>
          <span>
            {task.isCheck ? '✕' : ''}
          </span>
        </div>
      </form>
      <div className="buttons">
        <button className="btn btn-primary"
                onClick={() => toggleTask(task.id)}
                >
          {task.isCheck ? 'In To-Do' : 'Finished'} 
        </button>
        <button className="btn btn-primary"
                onClick={() => removeTask(task.id)}>
          Delete
        </button>
        <EditButton tasks={tasks} id={task.id} undoTask={undoTask} checkFlag={checkFlag} />
      </div>
    </div>
  );
}

export default Task;