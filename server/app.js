const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const poemsRouter = require("./controllers/api");
const middleware = require("./utils/middleware.js");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

// const url = `mongodb+srv://${config.USERNAME}:${config.PASSWORD}@poems.ft4ii.mongodb.net/poems?retryWrites=true&w=majority`;
// logger.info("connecting to", url);
// mongoose
//   .connect(url)
//   .then(() => {
//     logger.info("connected to MongoDB");
//   })
//   .catch((error) => {
//     logger.error("error connecting to MongoDB:", error.message);
//   });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/poems", poemsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
