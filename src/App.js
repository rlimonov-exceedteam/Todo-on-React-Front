import { useState } from 'react';
import Task from './Task.js' 
import ToDoForm from './ToDoForm.js';
import './App.scss'

function App() {
	const [tasks, setTasks] = useState([])

  const addTask = (userInput) => {
    if(userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2,9),
        task: userInput,
        isCheck: false
      }
      setTasks([...tasks, newItem])
    }
  }

  const removeTask = (id) => {
    setTasks([...tasks.filter((task) => task.id !== id)])
  }

  const handleToggle = (id) => {
    setTasks([
      ...tasks.map((task) => 
        task.id === id ? { ...task, isCheck: !task.isCheck } : {...task }
      ).sort((prev, next) => {
        if (!prev.isCheck && next.isCheck) return -1;
        else if (prev.isCheck && !next.isCheck) return 1;
        else return 0;
      })
    ])
  }

  return (
    <div className="App">
      <ToDoForm addTask={addTask} />
      <div className="wrapper">
        {tasks.map((elem) => {
          return (
            <Task
              task={elem}
              tasks={tasks}
              key={elem.id}
              toggleTask={handleToggle}
              removeTask={removeTask}
              />
          );
        })}
      </div>
    </div>
  );
}

export default App;
