const poemsRouter = require("express").Router();
const Poem = require("../models/poems");
const logger = require("../utils/logger");
const crypto = require("crypto");

poemsRouter.get("/", (request, response) => {
  Poem.find({}).then((poems) => {
    response.json(poems);
  });
});

//GET ALL
// poemsRouter.get("/", (request, response) => {
//   Poem.find({}).then((poems) => {
//     response.json(poems);
//   });
// });

//GET POEM
poemsRouter.get("/:id", (request, response, next) => {
  Poem.findById(request.params.id)
    .then((poem) => {
      if (poem) {
        response.json(poem);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//DELETE
poemsRouter.delete("/:id", (request, response, next) => {
  Poem.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

//ADD A POEM
poemsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const poem = new Poem({
    id: crypto.randomBytes(16).toString("hex"),
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

module.exports = poemsRouter;