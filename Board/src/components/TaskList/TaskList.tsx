import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../TaskCard/TaskCard';
import TaskForm from '../taskForm/TaskForm';
import './styles.css';  // Import the CSS file

function TaskList() {
  const [todo, setTodo] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [done, setDone] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/tasks')
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des tâches', error);
      });
  }, []);


  useEffect(() => {
    // Effectuer la requête GET pour récupérer toutes les tâches
    axios.get('http://localhost:1337/api/tasks?filters[state][$eq]=Todo&sort=id:desc')
      .then((response) => {
        setTodo(response.data.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des tâches', error);
      });
  }, [tasks]);

  useEffect(() => {
    // Effectuer la requête GET pour récupérer toutes les tâches
    axios.get('http://localhost:1337/api/tasks?filters[state][$eq]=In Progress&sort=id:desc')
      .then((response) => {
        setInprogress(response.data.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des tâches', error);
      });
  }, [tasks]);

  useEffect(() => {
    // Effectuer la requête GET pour récupérer toutes les tâches
    axios.get('http://localhost:1337/api/tasks?filters[state][$eq]=Done&sort=id:desc')
      .then((response) => {
        setDone(response.data.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des tâches', error);
      });
  }, [tasks]);

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

  const handleTaskCreate = (newTaskData) => {
    console.log("Task created  : ", newTaskData);
    setTasks([...tasks]);
  };

  return (
    <React.Fragment>
      <TaskForm onTaskCreate={handleTaskCreate} />

      <h1>Liste des Tâches</h1>

      <div className='tasks'>
        <div>
          <h1>A faire</h1>
          {todo.map((task) => (
            <TaskCard
              key={task.id}
              taskData={task}
              updateTaskState={updateTaskState}
            />
          ))}
        </div>
        <div>
          <h1>En cours</h1>
          {inprogress.map((task) => (
            <TaskCard
              key={task.id}
              taskData={task}
              updateTaskState={updateTaskState}
            />
          ))}
        </div>
        <div>
          <h1>Terminé</h1>
          {done.map((task) => (
            <TaskCard
              key={task.id}
              taskData={task}
              updateTaskState={updateTaskState}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </React.Fragment>

  );
}

export default TaskList;
