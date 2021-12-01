import React, { useState, useEffect } from 'react';
import { 
  Switch, 
  Route, 
  Redirect
} from 'react-router-dom';
import TaskList from './TaskList.js';
import ToDoForm from './ToDoForm.js';
import Task from './Task.js'
import axios from 'axios';
import './App.scss';

const App = () => {
	const [tasks, setTasks] = useState([]);

  const fromStorage = () => {
    return JSON.parse(localStorage.getItem('currentTask'));
  }

  const [currentTask, setCurrentTask] = useState(fromStorage() || {});

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
      <Switch>
        <Route path="/mainPage/">
          <TaskList
            tasks={tasks}                    
            setTasks={setTasks}
            setCurrentTask={setCurrentTask}
            currentTask={currentTask}
          />
        </Route>
        <Route path="/edit/:_id">
          <div className="wrapper">
            <Task
              task={currentTask}
              key={currentTask._id}
              setCurrentTask={setCurrentTask}
              currentTask={currentTask}
            />
          </div>
        </Route>
        <Redirect from="/" to="/mainPage/" />
      </Switch>
    </div>
  );
}

export default App;