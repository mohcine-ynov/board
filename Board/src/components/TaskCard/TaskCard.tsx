import React, { useState } from 'react';

function TaskCard({ taskData, updateTaskState }) {
  const [newState, setNewState] = useState(taskData.state);

  const handleStateChange = () => {
    // Appel de la fonction de mise à jour de l'état (updateTaskState) avec les nouvelles données
    updateTaskState(taskData.id, newState);
  };

  return (
    <div className="task-card">
      <h2>{taskData.title}</h2>
      <p>Description : {taskData.attributes.description}</p>
      <p>Priorité : {taskData.attributes.priority}</p>
      <p>État : {taskData.attributes.state}</p>     
      <select value={newState} onChange={(e) => setNewState(e.target.value)}>
        <option value="À faire">À faire</option>
        <option value="En cours">En cours</option>
        <option value="Terminée">Terminée</option>
      </select>
      <button onClick={handleStateChange}>Modifier État</button>
    </div>
  );
}

export default TaskCard;
