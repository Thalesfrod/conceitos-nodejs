const express = require("express");
const cors = require("cors");

const { v4: uuidv4, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //Rota que lista todos os repositórios;
  const { title } = request.query;
    
  const results = title
   ? repositories.filter(project => repo.title.includes(title))
   : repositories;
 
  return response.json(results);
});

app.post("/repositories", (request, response) => {
  //rota que cria repositorios
  const {title, url, techs} = request.body;
  const repo = {id: uuidv4(), title, url, techs, likes: 0};

  repositories.push(repo);

  return response.json(repo)
});

app.put("/repositories/:id", (request, response) => {
  // A rota deve alterar apenas o title, a url e as techs
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({"error": 'Repository not found.'})
  }
  
  const repo = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes, 
  }

  repositories[repoIndex] = repo;

  return response.json(repo);

});

app.delete("/repositories/:id", (request, response) => {
  // A rota deve deletar o repositório com o id presente nos parâmetros da rota
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({"error": 'Repository not found.'})
  };

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  //A rota deve aumentar o número de likes do repositório específico escolhido
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({"error": 'Repository not found.'})
  };

repositories[repoIndex].likes++;

return response.json(repositories[repoIndex]);

});

module.exports = app;
