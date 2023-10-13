import axios from 'axios';
import React, { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';

function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Basse',
    state: 'À faire',
  });

  const [taskData, setTaskData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Construire un objet avec les mêmes clés que dans l'exemple de Postman
    const newTaskData = {
      data: {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        state: formData.state,
      }
    };

    // Effectuer la requête POST vers l'API en utilisant Axios
    axios.post('http://10.31.34.17:1337/api/tasks', newTaskData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      console.log('Tâche créée avec succès', response.data);
    })
    .catch((error) => {
      console.error('Erreur lors de la création de la tâche', error);
    });
  };

  return (
    <div>
      <form>
        <label>
          Titre:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Priorité:
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <br />

        <label>
          État:
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <br />

        <button type="button" onClick={handleSubmit}>
          Sauvegarder
        </button>
      </form>
      {taskData && <TaskCard taskData={taskData} />}
    </div>
  );
}

export default TaskForm;