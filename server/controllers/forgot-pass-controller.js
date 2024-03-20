const User = require("../models/user-model");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

// Nodemailer setup
/* The code is creating a transporter object using the nodemailer library. The transporter object is
responsible for sending emails. */
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

/**
 * The `forgotPassword` function is an asynchronous function that handles the logic for generating a
 * reset password code and sending it to the user's email address.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made to the server. It includes properties such as `body`, `params`, `query`, `headers`,
 * etc. In this code snippet, `req.body` is used to access the request body, which typically contains
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to set the status code, headers, and
 * send the response body. In this code snippet, it is used to send JSON responses with status codes
 * and messages
 * @returns a JSON response with a message indicating that the reset password code has been
 * successfully sent to the user's email.
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "invalid EmailID" });
    }
    const generateCode = randomstring.generate({
      length: 6,
      charset: "numeric",
    });
    user.resetPassCode = generateCode;
    await user.save();
    let mailOptions = {
      from: "codewithpawanofficial@gmail.com",
      to: email,
      subject: "Password Reset Request for your NotePlus Account",
      text: `Dear ${user.firstname},
  
  We received a request to reset your password for your account on NotePlus.
        
  Important: We never send your actual password through email. To reset your password, please follow these steps:
        
  As you can see that you have already been redirected to Password Reset Page.
  
  Enter the 6-digit verification code you mention below.
  Your Reset Code : ${user.resetPassCode}
  
  Create a new, strong password that meets the following requirements:
    1. At least 8 characters long
    2. Contains a mix of uppercase and lowercase letters
    3. Includes at least one number
    4. Contains at least one special character (e.g., !@#$%^&*)
    5. Click "Reset Password".
        
  If you did not request a password reset, please disregard this email.
        
  For your security:
        
  We recommend changing your password regularly and choosing a strong password that you don't use for any other online accounts.
  Please be cautious of any emails that ask you to click on links or provide personal information unless you are certain they are legitimate.
  If you have any questions or encounter any difficulties during the password reset process, please don't hesitate to contact our support team at helpsupport@gmail.com
        
  Sincerely,
        
  The NotePlus Team`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "failed to send email"});
      }
      res.status(200).json({
        message: "Reset Password Code has been Successfully sent to your email",
      });
    });
    // console.log(`The reset code for this user is : ${generateCode}`);
    // console.log(`The user details is : ${user}`);
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json("Internal Server Error");
    // console.error(error);
  }
};

module.exports = forgotPassword;
