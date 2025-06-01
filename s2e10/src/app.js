const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
//this runs for every request that comes to our server

app.use(cookieParser());
//now when the request comes, we will be able to read the cookies

app.post("/signup", async (req, res) => {
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

//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.send(user);
    }

    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(400).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//get api to get the data of all the users
//whenever you are getting data you need to know from which model(class of the collection) we need to get the data
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//delete user api
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    // we need pass like { _id: userId } but as shorthand we can also pass just userId
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//update the user
//findoneandupadte({_id: id}) is equivalent to findbyidandupdate(id)
//ideally when we pass data, since userId is part of data, it should also be updated, but it will not as userId is not part of the schema
//third parameter options is { returnDocument: "after" }, if we use after, the final document will be returned and if we use before, the document before update will be returned
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdatedAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdatedAllowed) {
      throw new Error("update not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user udpated succesfully");
  } catch (err) {
    res.status(400).send("update failed" + err.message);
  }
});

app.post("/login", async (req, res) => {
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

// app.get("/profile", async (req, res) => {
//   try {
//     //this will get all the cookies
//     const cookie = req.cookies;
//     // here cookie will be undefined initially, so whenever we want to read a cookie, parse it and then read it
//     const { token } = cookie;
//     if (!token) {
//       throw new Error("Invalid token");
//     }
//     //validate the token
//     const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
//     const { _id } = decodedMessage;
//     console.log("token", _id);

//     //we want to get the profile back right, so do that
//     const user = await User.findById(_id);
//     //we get teh user data only if token is valid and present, lets say if you delete the token and try hitting, will get an error
//     //so handling token not present or invalid in the above

//     //will this even execute
//     if (!user) {
//       throw new Error("User does not exist");
//     }
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("Error" + err.message);
//   }
// });

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // user is attached to the request object in the userAuth middleware
    res.send(user);
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("db connection successful");

    app.listen(3000, () => {
      console.log("server is succesfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("db connection not successful");
  });
