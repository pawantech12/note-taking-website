const User = require("../models/user-model");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
// const bcrypt = require("bcryptjs");

/**
 * The function `register` is an asynchronous function that handles user registration by checking if
 * the email already exists, creating a new user if it doesn't, and returning a success message along
 * with a generated token and user ID.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `req.body` which contains the data sent
 * in the request body, `req.params` which contains route parameters, `req.query` which contains query
 * parameters, and many
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns a JSON response with the following properties:
 * - If the email already exists, it returns a 400 status code and a message "Email already exist".
 * - If the user is successfully created, it returns a 201 status code and a JSON object with the
 * following properties:
 *   - "msg": "Registration Successfull"
 *   - "token": the generated token for the user
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "codewithpawanofficial@gmail.com",
    pass: "ghihcljrufojsngj",
  },
  tls: {
    rejectUnauthorized: false
  }
});
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, email, phone, password } = req.body;

    // checking whether the email is already exist or not
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exist" });
    }

    // If user not exist then it will create new user
    const userCreated = await User.create({
      firstname,
      lastname,
      email,
      phone,
      password,
    });
    let mailOptions = {
      from: "codewithpawanofficial@gmail.com",
      to: email,
      subject: "Welcome to NotePlus!",
      text: `Hi ${userCreated.firstname} ${userCreated.lastname},

  Thanks for signing up for NotePlus! We're thrilled to welcome you to the community of people who are taking control of their ideas and boosting their productivity.
      
  NotePlus is a simple yet powerful web app designed to help you capture your thoughts, organize information, and achieve your goals. Whether you're a student jotting down lecture notes, a professional crafting meeting agendas, or simply someone who loves keeping to-do lists, NotePlus has you covered.
      
  Get Started with NotePlus:
      
  Ready to dive in? Here's how to get the most out of your NotePlus experience:
      
  Explore the Interface: Our user-friendly interface makes note-taking effortless. Take a few minutes to explore the features and discover how NotePlus can streamline your workflow.
  Create Your First Note: Get started by jotting down a quick idea or creating a detailed list. Experiment with features like rich text formatting and tags to personalize your notes.
  Organize Your Notes: Keep your thoughts organized with folders, tags, and color coding. Find what you need instantly with our powerful search functionality.

  We're Here to Help:
      
  If you have any questions or need assistance, don't hesitate to reach out to our friendly customer support team at codewithpawanofficial@gmail.com. We're always happy to help!
      
  Best regards,
      
  The NotePlus Team`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send email" });
      }
      res.status(200).json({
        msg: "Registration Successfull Email sent to your email",
      });
    });
    res.status(201).json({
      msg: "Registration Successfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

/**
 * The above function is a user login logic that checks if the provided email and password match a user
 * in the database, and returns a token and user ID if the login is successful.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is typically
 * provided by the web framework or server handling the request.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns The login function returns a response object with a status code and a JSON object
 * containing a message or a success message, token, and userId.
 */
// user login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // const user = await bcrypt.compare(password,userExist.password);
    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        msg: "Login Successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or password" });
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
    // console.error(error);
  }
};

const otpVerify = async (req, res) => { 
  //   console.log(req.body);
  const { otp, email } = req.body;
  try {
    // Query the database for the user with the provided email
    const user = await User.findOne({ email });

    // Check if user exists and if OTP matches
    if (user && user.resetPassCode === otp) {
      // OTP is valid, proceed with password reset
      res.status(200).json({ success: true, message: "OTP Verified Successfully" });
    } else {
      // OTP is invalid
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
  
}

// fetching all data of user using userid get from authenticating token
const getAllUserData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({message:'User not found'});

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({message:'Internal Server Error'});
  }
};

const updateUserData = async (req, res) => {
  const updatedFields = req.body;

  try {
    const user = await User.findById(req.params.userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields that were edited
    Object.keys(updatedFields).forEach(key => {
      if (updatedFields[key] !== undefined) {
        user[key] = updatedFields[key];
      }
    });

    const updatedUser = await user.save();
    res.json({ message: "User has been successfully updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { register, login ,getAllUserData,updateUserData,otpVerify};
