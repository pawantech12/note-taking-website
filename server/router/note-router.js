const express = require("express");
const router = express.Router();
/* These lines of code are importing the `noteController` and `verifyToken` modules from their
respective files. */
const noteController = require("../controllers/note-controller");
const verifyToken = require("../middlewares/verifyToken");

/* The code is defining different routes for handling HTTP requests related to notes. */
router.route("/notes").post(verifyToken, noteController.createNote);
router.route("/notes").get(verifyToken, noteController.getAllNotes);
router.route("/notes/:noteId").get(verifyToken, noteController.getNote);
router.route("/notes").delete(verifyToken, noteController.deleteAllNote);
router.route("/notes/:noteId").put(verifyToken, noteController.updateNote);
router.route("/notes/:noteId").delete(verifyToken, noteController.deleteNote);

module.exports = router;
