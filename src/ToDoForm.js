import React, { useState } from 'react';
import axios from 'axios';

const ToDoForm = ({ tasks, setTasks }) => {
  const [userInput, setUserInput] = useState('');

  const addTask = async (userInput) => {
    if (userInput) {
        await axios.post('http://localhost:8000/createTask', {
        text: userInput,
        isCheck: false,
      }).then(res => {
        if (res.statusText === 'OK') {
          const { _id, text, isCheck } = res.data
          const newItem = {
            _id,
            text,
            isCheck
            }
          setTasks([...tasks, newItem]);
        } else {
          alert(`Error HTTP: ${res.status}`);
        }
      });
    }
  }
  
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  }

  return (
    <form>
      <div className="Task">
        Create a task
      </div>
      <br />
      <div className="Input input-group">
        <textarea 
          className="form-control" 
          aria-label="With textarea"
          onChange={(e) => handleChange(e)}
          value={userInput}
        />
        <button 
          type="submit" 
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ToDoForm;