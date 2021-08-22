const express = require("express");
const app = express();
var cors = require("cors");

const fs = require("fs");

let rawdata = fs.readFileSync("poems.json");
let data = JSON.parse(rawdata);
let poems = data.poems;

//MIDDLE WARE START1
app.use(cors());
app.use(express.json());

//HOMEPAGE
app.get("/", (request, response) => {
  response.send("<h1>poem api at /api/poems</h1>");
});

//GET ALL
app.get("/api/poems", (request, response) => {
  response.json(data);
});

//GET ONE POEM
app.get("/api/poems/:id", (request, response) => {
  const id = Number(request.params.id);
  const poemData = poems.find((u) => u.id === id);
  if (poemData) {
    response.json(poemData);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  console.log(Math.max(...poems.map((n) => n.id)));
  const maxId = poems.length > 0 ? Math.max(...poems.map((n) => n.id)) : 0;
  return maxId + 1;
};

//ADD A UNIT
app.post("/api/poems", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const newPoem = {
    id: generateId(),
    title: body.title,
    author: body.author,
    text: body.text,
    votes: 0,
  };
  console.log(poems);

  poems = poems.concat(newPoem);
  console.log(poems);
  response.json(poems);
});

//MIDDLEWARE
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
