import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../TaskCard/TaskCard';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/tasks');
        setTasks(response.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches', error);
      }
    };

    fetchTasks();
  }, []);

  const updateTaskState = async (taskId, newState) => {
    try {
      await axios.put(`http://localhost:1337/api/tasks/${taskId}`, {
        data: {
          state: newState,
        }
      });
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          task.attributes.state = newState;
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'état de la tâche', error);
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Liste des Tâches</h1>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          taskData={task}
          updateTaskState={updateTaskState}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
