import Task from './Task.js';

const TaskList = ({ 
  tasks, 
  setCurrentTask, 
  currentTask 
}) => {

  return (
    <div className="wrapper">
      {tasks.map(elem => {
        return (
          <Task
            task={elem}
            key={elem.id}
            setCurrentTask={setCurrentTask}
            disabled={true}
            btnsFlag={false}
          />
        );
      })}
    </div>
  )
}

export default TaskList;