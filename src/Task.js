import React from 'react';
import { useState } from 'react';
import EditButton from './EditButton';

const Task = ({ task, index, toggleTask, removeTask }) => {
  const [flag, setFlag] = useState(true);
  const [text, setText] = useState(task.text)
  const { id, isCheck } = task;

  const checkFlag = (flag) => {
    setFlag(flag);
  }

  const undoTask = () => {
    setText(task.text);
    checkFlag(true);
  }

  const updateTask = () => {
    task.text = text;
    checkFlag(true);
  }

  const handleChangeText = (e) => {
    setText(e.currentTarget.value);
  }

  return (
    <div className="Task-text" key={id}>
      <form>
        <div className="input-group">
          <textarea 
            className={`form-control ${isCheck ? 'checked' : ''}`}
            value={text}
            onChange={(e) => handleChangeText(e)}
            disabled={flag}
          />
          <span>
            {isCheck && '✕'}
          </span>
        </div>
      </form>
      <div className="buttons">
        <button 
          className="btn btn-primary"
          onClick={() => toggleTask(index)}
        >
          {isCheck ? 'In To-Do' : 'Finished'} 
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => removeTask(id)}
        >
          Delete
        </button>
        <EditButton 
          currentTask={task} 
          undoTask={undoTask} 
          checkFlag={checkFlag} 
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}

export default Task;