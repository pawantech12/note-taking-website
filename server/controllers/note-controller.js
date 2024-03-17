const Note = require("../models/note-model");

// creating new notes for user
/**
 * The function `createNote` is an asynchronous function that creates a new note if it does not already
 * exist, and returns a success message if the note is created successfully.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is typically
 * provided by the web framework or server handling the request.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns a JSON response with a status code and a message. If the note already exists, it will
 * return a 400 status code with the message "Note already exist". If the note is successfully created,
 * it will return a 201 status code with the message "Note created Successfully". If there is an error,
 * it will return a 500 status code with the message "Internal Server
 */
const createNote = async (req, res) => {
  try {
    console.log(req.body);
    const { title, content , status} = req.body;

    // checking whether the Note is already exist or not
    const noteExist = await Note.findOne({ title: title });
    if (noteExist) {
      return res.status(400).json({ msg: "Note already exist" });
    }

    // If Note not exist then it will create new Note
    const noteCreated = await Note.create({
      title,
      content,
      status,
      user: req.user.userId,
    });
    res.status(201).json({
      msg: "Note created Successfully",
    });
  } catch (error) {
    res.status(500).json("Internal Server Error");
    console.log(error);
  }
};

const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.noteId, user: req.user.userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// fetching all notes of current user
/**
 * The function `getAllNotes` retrieves all notes belonging to a specific user and sends them as a JSON
 * response.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request such as headers, query parameters, and request body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It contains methods and properties that allow you to control the response, such as setting
 * the status code and sending JSON data.
 */
const getAllNotes = async (req, res) => {
  try {
    const status = req.query.status;
    const notes = await Note.find({ user: req.user.userId , status : status});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// updating specific notes using noteid
/**
 * The function updates a note with the provided title and content and returns a success message if the
 * update is successful.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, etc. It is typically
 * provided by the web framework or library that you are using.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * `json()` to send a JSON response, `status()` to set the status code of the response, and `send
 * @returns a JSON response with a message indicating whether the note has been successfully updated or
 * if the note was not found.
 */
const updateNote = async (req, res) => {
  const { title, content ,status} = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.noteId,
      { title, content ,status},
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ msg: "Note not Found" });
    }
    res.json({ msg: "Note has been successfully Updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * The function `deleteNote` deletes a specific note from the database using the note's ID.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * request, such as the request parameters, headers, and body. In this case, `req.params.noteId` is
 * used to retrieve the `noteId` parameter from the request URL.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns If the note is successfully deleted, a response with status code 200 and a message "Note
 * has been Deleted Successfully" is returned. If the note is not found, a response with status code
 * 404 and a message "Note not Found" is returned. If there is an error during the deletion process, a
 * response with status code 500 and an error message is returned.
 */
// deleting specific note using noteid
const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not Found" });
    }
    res.status(200).json({ message: "Note has been Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// deleting all note using noteid
/**
 * The function `deleteAllNote` deletes all notes associated with a specific user.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns a JSON response with a success message if all notes belonging to the user have been deleted
 * successfully. If no notes are found for the user, a JSON response with a 404 status code and a
 * message indicating that no notes were found is returned. If an error occurs during the deletion
 * process, a JSON response with a 500 status code and an error message is returned.
 */
const deleteAllNote = async (req, res) => {
  try {
    const deletedAllNote = await Note.deleteMany({ user: req.user.userId });
    if (!deletedAllNote) {
      return res.status(404).json({ message: "No Notes found" });
    }
    res.status(200).json({ message: "All Note has been Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* The `module.exports` statement is used to export the functions `createNote`, `getAllNotes`,
`updateNote`, `deleteNote`, and `deleteAllNote` from this module. By exporting these functions, they
can be imported and used in other modules or files. */
module.exports = {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
  deleteAllNote,
};
