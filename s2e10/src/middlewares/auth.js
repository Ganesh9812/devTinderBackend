const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //read the token from the req cookies

    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");

    //validate the token

    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    req.user = user; // attach user to the request object
    if (!user) {
      throw new Error("User does not exist");
    }
    //if user found then calling the next to call the next handler
    next();
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
