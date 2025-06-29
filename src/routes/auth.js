const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data..lets put this in helper function
    validateSignUpData(req);

    //encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    //now store this passwordhash in the db

    //creating a new instance of the user model
    //passing only 4 fields and rest if pass in the req body they will be ignore as right now we concerned about only 4 fields
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    //login api takes email and password validate email and password is correct
    //use bcrypt.compare
    const { emailId, password } = req.body;

    //first check if the person emailId is valid or present in the db
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Emailid not present in the db");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //create a jwt token
      //lets write jwt token code here, first param is hiding the data in the token, here we are hiding userid
      //second param is secret key, this is used to encrypt the data...this is kind of password and only server knows this
      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
      //   expiresIn: "1d",
      // });
      //commented the above as now moved to user model

      const token = await user.getJWT(); // using the method defined in the user model to get the JWT
      // the current user token will come back

      //add the token to the cookie and send back the response to the user and this token can be used for other api calls to validate which now will be present in req.cookies
      res.cookie("token", token);
      res.send("login successful");
    } else {
      throw new Error("password is not valid");
    }
  } catch (err) {
    res.status(400).send("login failed" + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout successful");
});
//in other apps, logout api can be complicated.
//so in app.js we have written app.post or app.get, so whats the diff....there is no much diff, all the concepts remains same

module.exports = authRouter;
