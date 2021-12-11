const mongoose = require("mongoose");
const config = require("../utils/config");
const { requestLogger } = require("../utils/middleware");

const url = `mongodb+srv://${config.USERNAME}:${config.PASSWORD}@poems.ft4ii.mongodb.net/poems?retryWrites=true&w=majority`;

console.log("connecting to", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const poemSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  votes: {
    type: Number,
  },
  articleImage: {
    type: String,
  },
  posted: {
    type: Date,
  },
});

poemSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Poem", poemSchema);
