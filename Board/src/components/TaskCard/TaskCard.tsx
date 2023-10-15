import React from 'react';
import axios from 'axios';
import './styles.css';  // Import the CSS file

function TaskCard({ taskData, updateTaskState, deleteTask }) {
  const handleStateChange = (newState) => {
    updateTaskState(taskData.id, newState);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:1337/api/tasks/${taskData.id}`)
      .then(() => {
        deleteTask(taskData.id);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la tâche', error);
      });
  };

  return (
    <div className="task-card">
      <div className='title'>
        <h3>{taskData.attributes.title}</h3>
      </div>
      <div className='buttons'>
        <button onClick={() => handleStateChange('Todo')} id="todo">A faire</button>
        <button onClick={() => handleStateChange('In Progress')} id="inprogress">En cours</button>
        <button onClick={() => handleStateChange('Done')} id="done">Terminée</button>
        <button onClick={handleDelete} id="delete">Supprimer</button>
      </div>

    </div>
  );
}

export default TaskCard;
