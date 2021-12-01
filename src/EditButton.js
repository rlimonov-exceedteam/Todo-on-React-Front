import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EditButton = ({ 
  currentTask, 
  undoTask, 
  checkFlag, 
  updateTask, 
  history,
  setCurrId
}) => {
  

  return (
      <div onClick={() => openEdit(_id)}>  
        {
          flag && 
            <button 
              className="btn btn-primary edit-btn" 
              onClick={() => checkFlag(false)}
              disabled={isCheck}
            >
              Edit
            </button>
        }
        { 
          !flag && 
          <Link to="/mainPage">
            <div>
              <button 
                className="btn btn-primary ok-undo" 
                onClick={() => updateTask(_id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
              <button 
                className="btn btn-primary ok-undo" 
                onClick={() => undoTask()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                  <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                </svg>
              </button>
            </div>
          </Link>
        }
      </div>
  )
}

export default EditButton;