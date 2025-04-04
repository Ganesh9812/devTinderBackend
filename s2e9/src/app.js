const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());
//this runs for every request that comes to our server

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
      res.send("login successful");
    } else {
      throw new Error("password is not valid");
    }
  } catch (err) {
    res.status(400).send("login failed" + err.message);
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
