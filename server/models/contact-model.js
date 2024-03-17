const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    subject: {
        type: String,
        require:true,
    },
    message: {
        type: String,
        require:true,
    }
});
  
// define the model or the collection name
const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact; 