import { useState } from 'react';
import Task from './Task.js';
import ToDoForm from './ToDoForm.js';
import './App.scss';

const App = () => {
	const [tasks, setTasks] = useState([])

  const removeTask = (id) => {
    setTasks([...tasks.filter((task) => task.id !== id)]);
  }

  const handleToggle = (index) => {
    setTasks([
      ...tasks.map((task, i) => 
        i === index ? { ...task, isCheck: !task.isCheck } : {...task }
      ).sort((prev, next) => (!prev.isCheck && next.isCheck) ? -1 : 1)
    ])
  }

  return (
    <div className="App">
      <ToDoForm 
        tasks={tasks} 
        setTasks={setTasks} 
      />
      <div className="wrapper">
        {tasks.map((elem, i) => {
          return (
            <Task
              task={elem}
              tasks={tasks}
              key={elem.id}
              index={i}
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
