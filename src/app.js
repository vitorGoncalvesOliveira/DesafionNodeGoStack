const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(newRepository)

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const idx = repositories.findIndex((repository) => repository.id === id);
  if (idx < 0)
    return response.status(400).json("Repository not found!");

  repositories[idx] = ({ ...repositories[idx], title, url, techs })

  return response.json(repositories[idx]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const idx = repositories.findIndex((repository) => repository.id === id);
  if (idx < 0)
    return response.status(400).json("Repository not found!");

  repositories.splice(idx, 1);
  return response.status(204).send("");

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const idx = repositories.findIndex((repository) => repository.id === id);
  if (idx < 0)
    return response.status(400).json("Repository not found!");

  repositories[idx].likes += 1;

  return response.json(repositories[idx]);

});

module.exports = app;
