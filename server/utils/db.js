const mongoose = require("mongoose");
const MongoURI = process.env.MONGODB_URI;

/**
 * The function `connectDB` connects to a MongoDB database using the `mongoose` library and logs a
 * success message if the connection is successful, or an error message if the connection fails.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(MongoURI);
    console.log("Connection successfull to database");
  } catch (error) {
    console.error('Database connection unsuccessfull',error);

  }
};

module.exports = connectDB;
