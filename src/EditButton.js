import { useState } from 'react';

const EditButton = ({ tasks, id, undoTask, checkFlag }) => {
  const [flag, setFlag] = useState(true);
  const currentTask = tasks.filter(elem => elem.id === id)[0];

  const changeFlag = () => {
    setFlag(!flag);
  }

  const update = (e) => {
    const todo = e.target.parentElement.parentElement.parentElement.parentElement;
    const text = todo.children[0].children[0].children[0].value;
    tasks.map(elem => {
      if (elem.id === id) elem.task = text;
    })
    checkFlag(true);
  }

  const editBtn = (
                  <button className="btn btn-primary" 
                          onClick={() => checkFlag(false)} 
                          style={{width: '100%'}}
                          disabled={currentTask.isCheck}>
                    Edit
                  </button>
                  )

  const okUndoBtns =  (
                      <div>
                        <button className="btn btn-primary" 
                                onClick={update}
                                style={{width: '50%'}}>
                          ✔
                        </button>
                        <button className="btn btn-primary" 
                                onClick={undoTask}
                                style={{width: '50%'}}>
                          ✕
                        </button>
                      </div>
                      )
  
  return (
      <div onClick={changeFlag}>  
        {flag ? editBtn : okUndoBtns}
      </div>
  )
}

export default EditButton;