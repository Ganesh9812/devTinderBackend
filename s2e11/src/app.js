const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
//this runs for every request that comes to our server

app.use(cookieParser());
//now when the request comes, we will be able to read the cookies

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

//so whenever a request is comign with /, then we will ask to go authRouter and check if there is a route matching and response, then it wil not go furthur
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const user = await User.findOne({ emailId: userEmail });
//     if (!user) {
//       res.status(400).send("user not found");
//     } else {
//       res.send(user);
//     }

//     // const users = await User.find({ emailId: userEmail });
//     // if (users.length === 0) {
//     //   res.status(400).send("User not found");
//     // } else {
//     //   res.send(users);
//     // }
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

//get api to get the data of all the users
//whenever you are getting data you need to know from which model(class of the collection) we need to get the data
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

//delete user api
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     // we need pass like { _id: userId } but as shorthand we can also pass just userId
//     res.send("user deleted successfully");
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

//update the user
//findoneandupadte({_id: id}) is equivalent to findbyidandupdate(id)
//ideally when we pass data, since userId is part of data, it should also be updated, but it will not as userId is not part of the schema
//third parameter options is { returnDocument: "after" }, if we use after, the final document will be returned and if we use before, the document before update will be returned
// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

//     const isUpdatedAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );

//     if (!isUpdatedAllowed) {
//       throw new Error("update not allowed");
//     }
//     const user = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("user udpated succesfully");
//   } catch (err) {
//     res.status(400).send("update failed" + err.message);
//   }
// });

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
