import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../TaskCard/TaskCard';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Effectuer la requête GET pour récupérer toutes les tâches
    axios.get('http://localhost:1337/api/tasks')
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des tâches', error);
      });
  }, []);

  const updateTaskState = (taskId, newState) => {
    // Effectuer la requête PUT pour mettre à jour l'état de la tâche
    axios.put(`http://localhost:1337/api/tasks/${taskId}`, {
      data: {
        state: newState,
      }
    })
      .then((response) => {
        // Mettre à jour l'état local des tâches après la modification
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            task.attributes.state = newState;
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de l\'état de la tâche', error);
      });
  };

  return (
    <div>
      <h1>Liste des Tâches</h1>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          taskData={task}
          updateTaskState={updateTaskState}
        />
      ))}
    </div>
  );
}

export default TaskList;
