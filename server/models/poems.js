const mongoose = require("mongoose");
const config = require("./utils/config");

const url = config.MONGODB_URI;

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
  title: String,
  author: String,
  text: String,
  votes: Number,
});

poemSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Poem", poemSchema);
