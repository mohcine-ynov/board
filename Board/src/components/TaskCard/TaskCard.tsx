import React from 'react';
import axios from 'axios';

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
      <h3>{taskData.attributes.title}</h3>
      <p>État : {taskData.attributes.state}</p>
      <button onClick={() => handleStateChange('Terminée')}>Terminée</button>
      <button onClick={() => handleStateChange('En cours')}>En cours</button>
      <button onClick={() => handleStateChange('A faire')}>A faire</button>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
}

export default TaskCard;
