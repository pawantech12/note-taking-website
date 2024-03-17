/**
 * The function `sendResetSuccess` sends an email to the user to notify them that their password has
 * been successfully reset.
 * @param transporter - The `transporter` parameter is an object that is used to send emails. It is
 * typically created using a library like Nodemailer, and it contains the configuration settings for
 * the email server (SMTP server) that will be used to send the email.
 */
const sendResetSuccess = async (transporter) => {
  try {
    let mailOptions = {
      from: "codewithpawanofficial@gmail.com",
      to: email,
      subject: "Your NotePlus Password Has Been Reset",
      text: `Dear ${user.firstname},
    
  This email confirms that your NotePlus password has been successfully reset. You can now log in to your account using your new password.
  Here's how to log in to your NotePlus account:
    
    1. Go to NotePlus login page.
    2. Enter your email address and new password in the login fields.
    3. Click on "Log in".
    If you have any trouble logging in or have any other questions, please don't hesitate to contact NotePlus support at [support email address or phone number].
    
  Thank you for using NotePlus!
    
  Sincerely,
    
  The NotePlus Team`,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send email" });
      }
      res.status(200).json({
        message: "Your Password has been Changed Sucessfully",
      });
    });
  } catch (error) {}
};

module.exports = sendResetSuccess;
