const jwt = require("jsonwebtoken");

/**
 * The `verifyToken` function is a middleware that checks if a token is provided in the request header,
 * verifies the token using a secret key, and attaches the decoded user information to the request
 * object.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, query parameters, and request body. It is an object that is passed to
 * the middleware function by the Express framework.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically called at the end of the current middleware
 * function to indicate that it has completed its processing and the next middleware function should be
 * called.
 * @returns If there is no token provided, the function will return a response with a status code of
 * 401 and a JSON object containing the message "Access denied. No token provided."
 */
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    console.log("authenticated User Token info: ", req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
