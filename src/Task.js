import React, { useState, useEffect } from 'react';
import EditButton from './EditButton';
import axios from 'axios';

const Task = ({ task, index, tasks, setTasks }) => {
  const [flag, setFlag] = useState(true);
  const [text, setText] = useState(task.text);
  const { _id, isCheck } = task;

  useEffect(() => {
    setText(task.text);
  }, [task.text]);

  const checkFlag = (flag) => {
    setFlag(flag);
  }

  const undoTask = () => {
    setText(task.text);
    checkFlag(true);
  }

  const updateTask = async (_id) => {
    await axios.patch('http://localhost:8000/updateTask', {
      text,
      _id
    }).then(res => {
      if (res.statusText === 'OK') {
        task.text = text;
        checkFlag(true);
      } else {
        alert(`Error HTTP: ${res.status}`);
      }
    });
  }

  const removeTask = async (_id) => {
    await axios.delete(`http://localhost:8000/deleteTask?_id=${_id}`).then(res => {
      if (res.statusText === 'OK') {
        setTasks([...tasks.filter((task) => task._id !== _id)]);
      } else {
        alert(`Error HTTP: ${res.status}`);
      }
    });
  }

  const handleToggle = async (index) => {
    await axios.patch('http://localhost:8000/updateTask', {
      isCheck: !isCheck,
      _id
    }).then(res => {
      if (res.statusText === 'OK') {
        setTasks([
          ...tasks.map((task, i) => 
            i === index ? { ...task, isCheck: !task.isCheck } : {...task }
          ).sort((prev, next) => (!prev.isCheck && next.isCheck) ? -1 : 1)
        ])
      } else {
        alert(`Error HTTP: ${res.status}`);
      }
    })
  }

  const handleChangeText = (e) => {
    setText(e.currentTarget.value);
  }

  return (
    <div className="Task-text" key={_id}>
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
          onClick={() => handleToggle(index)}
        >
          {isCheck ? 'In To-Do' : 'Finished'} 
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => removeTask(_id)}
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