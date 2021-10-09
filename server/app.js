const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const poemsRouter = require("./controllers/api");
const middleware = require("./utils/middleware.js");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/poems", poemsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
