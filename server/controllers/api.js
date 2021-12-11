const poemsRouter = require("express").Router();
const Poem = require("../models/poems");
const logger = require("../utils/logger");

//image
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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
poemsRouter.post(
  "/",
  upload.single("articleImage"),
  (request, response, next) => {
    const body = request.body;

    // send error  if authorisation token does not match
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
      articleImage: request.file.originalname,
      posted: body.posted,
      userId: body.userId,
    });

    poem
      .save()
      .then((savedPoem) => {
        response.json(savedPoem);
      })
      .catch((error) => next(error));
  }
);

//update votes
poemsRouter.post(
  "/:id/votes",

  (request, response, next) => {
    const body = request.body;

    const update = {
      title: body.title,
      author: body.author,
      text: body.text,
      votes: body.votes,
      posted: body.posted,
    };

    Poem.findByIdAndUpdate(request.params.id, update)
      .then(() => {
        response.status(204).end();
      })
      .catch((error) => next(error));
  }
);

//update poem
poemsRouter.post(
  "/:id",
  upload.single("articleImage"),
  (request, response, next) => {
    const body = request.body;

    // send error  if authorisation token does not match
    if (!getTokenFrom(request)) {
      return response.status(401).json({
        error: "not authorised to make a post",
      });
    }

    const update = {
      id: body.id,
      title: body.title,
      author: body.author,
      text: body.text,
      votes: body.votes,
      posted: body.posted,
      articleImage: body.articleImage,
    };

    Poem.findByIdAndUpdate(request.params.id, update)
      .then(() => {
        response.json(update).status(204).end();
      })
      .catch((error) => next(error));
  }
);

// FIND USER PROFILE POEMS
poemsRouter.get("/profile/:id", async (request, response) => {
  // find all poems with id as 'userId'
  const poems = await Poem.find({
    userId: request.params.id,
  });

  return response.status(200).json(poems);
  // }
});

module.exports = poemsRouter;
