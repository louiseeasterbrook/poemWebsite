const express = require("express");
const app = express();
var cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { json } = require("express");
require("dotenv").config();

let rawdata = fs.readFileSync("poems.json");
let data = JSON.parse(rawdata);
let poems = data.poems;

//MIDDLE WARE START1
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

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
    response.send("Poem not found");
  }
});

const generateId = () => {
  const maxId = poems.length > 0 ? Math.max(...poems.map((n) => n.id)) : 0;
  return maxId + 1;
};

//retrieve token value
const getTokenFrom = (request) => {
  const authorization = request.get("bob");
  //check of header is there & check if equals desired value
  if (authorization && authorization === "Bobalooba") {
    return true;
  }
  return false;
};

//ADD A UNIT
app.post("/api/poems", (request, response) => {
  const body = request.body;

  //send error if input content is missing
  if (!body.title || !body.author || !body.text) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  //send error  if authroisation token does not match
  if (!getTokenFrom(request)) {
    return response.status(401).json({
      error: "not authorised to make a post",
    });
  }

  const newPoem = {
    id: generateId(),
    title: body.title,
    author: body.author,
    text: body.text,
    votes: Number(0),
  };

  poems = poems.concat(newPoem);
  data.poems = poems;

  response.json(poems);
});

//update vote
app.post("/api/poems/:id", (request, response) => {
  const id = Number(request.params.id);

  const poemsUpdated = poems.map((el) => (el.id === id ? request.body : el));
  poems = poemsUpdated;
  data.poems = poemsUpdated;

  response.json(request.body);
});

//MIDDLEWARE
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
