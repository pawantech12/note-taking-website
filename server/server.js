/* `require("dotenv").config();` is a line of code that is used to load environment variables from a
`.env` file into the Node.js process. The `.env` file typically contains sensitive information such
as API keys, database credentials, and other configuration variables. By using `dotenv` module and
calling `config()`, the environment variables defined in the `.env` file are made available to the
application. */
require("dotenv").config();
/* These lines of code are importing various modules and setting up the necessary components for the
application. */
const express = require("express");
const app = express();
const cors  = require("cors");
const connectDB = require("./utils/db");
const router = require("./router/auth-router");
const noterouter = require("./router/note-router");
const contactrouter = require("./router/contact-router");

/* `app.use(express.json())` is a middleware function that parses incoming requests with JSON payloads.
It allows the application to access the request body as a JavaScript object. */
app.use(express.json());
const corsOptions = {
  origin: "https://note-taking-website-six.vercel.app/",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/auth", router);
app.use("/api", noterouter);
app.use("/api", contactrouter);

const port = 3000;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
});
