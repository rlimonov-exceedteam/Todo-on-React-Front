import { useState } from 'react'

function ToDoForm({ addTask }) {
  const [userInput, setUserInput] = useState('');
  
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
        <textarea className="form-control" 
                  aria-label="With textarea"
                  onChange={handleChange}
                  value={userInput}>
        </textarea>
        <button type="submit" 
                className="btn btn-primary"
                onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ToDoForm;