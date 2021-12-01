import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Task = ({ 
  task, 
  setCurrentTask,
  disabled,
  btnsFlag
}) => {
  const [text, setText] = useState(task.text);
  const { _id } = task;
  const history = useHistory();

  const openEdit = () => {
    setCurrentTask(task);
    localStorage.setItem('currentTask', JSON.stringify(task));
    history.push(`/edit/${_id}`);
  }

  const undoTask = () => {
    setText(task.text);
  }

  useEffect(async () => {
    await axios.patch('http://localhost:8000/updateTask', {
      text,
      _id
    }).then(res => {
      if (res.statusText === 'OK') {
        task.text = text;
      } else {
        alert(`Error HTTP: ${res.status}`);
      }
    });
  }, [task.text]);

  const updateTask = async () => {
    task.text = text;
    setText(task.text);
  }

  const handleChangeText = (e) => {
    setText(e.currentTarget.value);
  }

  return (
    <div className="Task-text" key={_id}>
      <form>
        <div className="input-group">
          <textarea 
            className='form-control'
            value={text}
            onChange={(e) => handleChangeText(e)}
            disabled={disabled}
          />
        </div>
      </form>
      <div className="buttons">  
        {
          !btnsFlag && 
            <button 
              className="btn btn-primary edit-btn"
              onClick={() => openEdit()}
            >
              Edit
            </button>
        }
        { 
          btnsFlag && 
          <Link to="/mainPage">
            <div className="ok-undo">
              <button 
                className="btn btn-primary ok-undo" 
                onClick={() => updateTask()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
              <button 
                className="btn btn-primary ok-undo" 
                onClick={() => undoTask()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                  <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                </svg>
              </button>
            </div>
          </Link>
        }
      </div>
    </div>
  );
}

export default Task;