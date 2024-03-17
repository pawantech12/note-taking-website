const express = require("express");
const router = express.Router();
/* These lines of code are importing the functions or controllers from the respective files. */
const authcontrollers = require("../controllers/auth-controller");
const forgotPassword = require("../controllers/forgot-pass-controller");
const resetPassword = require("../controllers/reset-pass-controller");
const verifyToken = require("../middlewares/verifyToken");

/* These lines of code are defining the routes for the different endpoints of the API. */
router.route("/register").post(authcontrollers.register);
router.route("/login").post(authcontrollers.login);
router.route("/forgot-password").post(forgotPassword);
router.route("/otp-verify").post(authcontrollers.otpVerify);
router.route("/reset-password").post(resetPassword);
router.route("/user").get(verifyToken, authcontrollers.getAllUserData);
router.route("/user/:userID").put(verifyToken, authcontrollers.updateUserData);

module.exports = router;
