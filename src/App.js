import React, { useState, useEffect } from 'react';
import Task from './Task.js';
import ToDoForm from './ToDoForm.js';
import axios from 'axios';
import './App.scss';

const App = () => {
	const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    await axios.get('http://localhost:8000/allTasks').then(res => {
      if (res.statusText === 'OK') {
        const result = res.data.data;
        setTasks([...result.sort((prev, next) => (!prev.isCheck && next.isCheck) ? -1 : 1)]);
      } else {
        alert(`Error HTTP: ${res.status}`);
      }
    });
  }, []);


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
              key={elem.id}
              index={i}
              tasks={tasks}
              setTasks={setTasks}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
