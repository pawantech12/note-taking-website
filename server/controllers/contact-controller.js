const Contact = require("../models/contact-model");
const nodemailer = require("nodemailer");

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
const contact = async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, phone, subject,message } = req.body;
  
      // If user not exist then it will create new user
        const contactCreated = await Contact.create({ name, email, phone, subject, message });
        if (contactCreated) {
            res.status(200).json({
              message: "You message has successfully sent to us. We will get back to you soon.",
            });
            let mailOptions = {
                from: "codewithpawanofficial@gmail.com",
                to: email,
                subject: "Thanks for Reaching Out to NotePlus!",
                text: `Hi ${name},

    Thank you for contacting NotePlus! We appreciate you taking the time to reach out and for your interest in our note-taking app.
                
    We received your inquiry through our contact form and a member of our team will be in touch shortly to answer your questions or address your concerns.
                
    In the meantime, you can explore our website to learn more about NotePlus's features and benefits.
                
    If you have any further questions before we connect, please don't hesitate to reply to this email.
                
    We look forward to assisting you!
                
    Sincerely,
    The NotePlus Team`,
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return res.status(500).json("Failed to send email");
                }
                res.status(200).json("successfull sent email");
              });
        }
    } catch (error) {
      res.status(500).json({message:"Internal Server Error"});
    }
  };

  module.exports = contact;