const mongoose = require("mongoose");

/* The code is defining a Mongoose schema for a "Note" model. The schema specifies the structure and
properties of a note object. */
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

/* `const Note = new mongoose.model("Note", noteSchema);` is creating a Mongoose model named "Note"
based on the defined noteSchema. The model is then assigned to the constant variable "Note". This
allows us to perform CRUD operations (Create, Read, Update, Delete) on the "Note" collection in the
MongoDB database using the Mongoose model. */
const Note = new mongoose.model("Note", noteSchema);
module.exports = Note;
