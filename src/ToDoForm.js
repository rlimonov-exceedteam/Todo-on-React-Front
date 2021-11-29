import React from 'react';
import { useState } from 'react';

const ToDoForm = ({ tasks, setTasks }) => {
  const [userInput, setUserInput] = useState('');

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2,9),
        text: userInput,
        isCheck: false
      }
      setTasks([newItem, ...tasks]);
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