// Now we will define the structure for registration form
const mongoose = require("mongoose");
/* `const bcrypt = require("bcryptjs");` is importing the bcryptjs library, which is used for hashing
passwords. It provides functions to hash passwords and compare hashed passwords with plain text
passwords. */
const bcrypt = require("bcryptjs");
/* `const jwt = require("jsonwebtoken");` is importing the `jsonwebtoken` library in order to use its
functions for generating and verifying JSON Web Tokens (JWTs). JWTs are used for authentication and
authorization purposes in web applications. */
const jwt = require("jsonwebtoken");
/* The code `const userSchema = new mongoose.Schema({ ... })` is defining the structure or schema for a
user in a registration form. It uses the `mongoose.Schema` class to create a new schema object. */
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
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
  password: {
    type: String,
    require: true,
  },
  resetPassCode: {
    type: String,
    default: " ",
  },
  city: {
    type: String,
    default:" ",
  },
  state: {
    type: String,
    default:" ",
  },
  country: {
    type: String,
    default:" ",
  },
  dob: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: String,
    default:" ",
  },
  age: {
    type: Number,
    default:0,
  },
  address: {
    type: String,
    default:" ",
  },
});

// hashing password : method 2
/* The code `userSchema.pre("save", async function (next) { ... })` is a pre-save middleware function
in Mongoose. It is executed before saving a user document to the database. */
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});
// json web token
/* The `userSchema.methods.generateToken` function is used to generate a JSON Web Token (JWT) for the
user. */
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};
// compare the password
/* The `userSchema.methods.comparePassword` function is used to compare a plain text password with the
hashed password stored in the user document. It takes a password as an argument and uses the
`bcrypt.compare` function to compare the plain text password with the hashed password. */
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;
