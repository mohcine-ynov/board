import axios from 'axios';
import React, { useState } from 'react';

function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Basse',
    state: 'À faire',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Construire un objet avec les mêmes clés que dans l'exemple de Postman
    const taskData = {
      data: {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        state: formData.state,
      }
    };

    // Effectuer la requête POST vers l'API en utilisant Axios
    axios.post('http://10.31.34.17:1337/api/tasks', taskData, {
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
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </select>
      </label>
      <br />

      <label>
        État:
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option value="À faire">À faire</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
      </label>
      <br />

      <button type="button" onClick={handleSubmit}>
        Sauvegarder
      </button>
    </form>
  );
}

export default TaskForm;