const poemsRouter = require("express").Router();
const Poem = require("../models/poems");
const logger = require("../utils/logger");

//GET ALL
poemsRouter.get("/", (request, response) => {
  Poem.find({}).then((poems) => {
    response.json(poems);
  });
});

//GET POEM
poemsRouter.get("/:id", (request, response) => {
  Poem.findById(request.params.id)
    .then((poem) => {
      if (poem) {
        response.json(poem);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => response.status(404).json({ error: "Not found" }));
});

//DELETE
poemsRouter.delete("/:id", (request, response) => {
  Poem.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => response.status(404).json({ error: "Not found" }));
});

//function to retrieve token value
const getTokenFrom = (request) => {
  const authorization = request.get("bob");
  //check of header is there & check if equals desired value
  if (authorization && authorization === "Bobalooba") {
    return true;
  }
  return false;
};

//ADD A POEM
poemsRouter.post("/", (request, response) => {
  const body = request.body;

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

  const poem = new Poem({
    title: body.title,
    author: body.author,
    text: body.text,
    votes: Number(0),
  });

  poem
    .save()
    .then((savedPoem) => {
      response.json(savedPoem);
    })
    .catch((error) => next(error));
});

//update votes
poemsRouter.post("/:id", (request, response) => {
  const body = request.body;

  if (!body.title || !body.author || !body.text) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const update = {
    votes: request.body.votes,
    title: request.body.title,
    text: request.body.text,
    author: request.body.author,
  };

  Poem.findByIdAndUpdate(request.params.id, update)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => response.status(400).json({ error: { error } }));
});

module.exports = poemsRouter;
