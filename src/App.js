import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then( response => {
      console.log(response.data);
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const response =  await api.post('/repositories', {
      title: `Projeto Novo ${Date.now()}`,
      url: `http://github.com/react...`,
      techs:  ["Native", "React"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log(id);

    api.delete(`/repositories/${id}`).then(response => {
      let repositoryIndex = repositories.findIndex(repository => repository.id == id);

      repositories.splice(repositoryIndex, 1);

      setRepositories([...repositories]);
    });
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          (
            <li key={repository.id}>
              {repository.title}
              
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
