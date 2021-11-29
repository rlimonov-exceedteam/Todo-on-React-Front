import { useState } from 'react';

const EditButton = ({ currentTask, undoTask, checkFlag, updateTask }) => {
  const [flag, setFlag] = useState(true);

  const changeFlag = () => {
    setFlag(!flag);
  }

  const editBtn = (
    <button 
      className="btn btn-primary edit-btn" 
      onClick={() => checkFlag(false)}
      disabled={currentTask.isCheck}
    >
      Edit
    </button>
  )

  const okUndoBtns = (
    <div>
      <button 
        className="btn btn-primary ok-undo" 
        onClick={() => updateTask()}
      >
        ✔
      </button>
      <button 
        className="btn btn-primary ok-undo" 
        onClick={() => undoTask()}
      >
        ✕
      </button>
    </div>
  )
  
  return (
    <div onClick={() => changeFlag()}>  
      {flag ? editBtn : okUndoBtns}
    </div>
  )
}

export default EditButton;