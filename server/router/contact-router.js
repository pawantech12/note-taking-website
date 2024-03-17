const express = require("express");
const contact = require("../controllers/contact-controller");

const router = express.Router();
/* These lines of code are importing the `noteController` and `verifyToken` modules from their
respective files. */



/* The code is defining different routes for handling HTTP requests related to notes. */
router.route("/contact").post(contact);


module.exports = router;
