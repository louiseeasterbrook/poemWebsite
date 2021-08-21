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

//MIDDLEWARE
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
