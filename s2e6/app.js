const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

//create a post api which will signup the user
//signup api
app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Ganesh1",
    lastName: "Pavan",
    emailId: "ganeshpavankumars@gmail.com",
    password: "pavan@123",
  };
  const user = new User(userObj);
  //creating an instance of the model
  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    err.status(400).send("Error saving the user" + err.message);
  }
});

//how to save this user to db into our user collection
//we need to create an instance of the model and add to the db and save the instance

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
