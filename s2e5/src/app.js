const express = require("express");

const app = express();

// app.use(
//   "/abc",
//   (req, res) => {
//     res.send("response1");
//   },
//   (req, res) => {
//     res.send("response2");
//   }
// );
//what if we didnt send any response
//it goes to infinite loop, after sometime there will be timeout hit and after that this request will be timed out

// one more to define route handler instead of nesting, this is same as the above
// app.get("/user", (req, res, next) => {
//   console.log("handling first route hanlder");
//   next();
// });

// app.get("/user", (req, res) => {
//   console.log("second route handler");
//   res.send("response2");
// });

//why we need middlewares
app.get("/admin/getData", (req, res) => {
  //check if the request is authorised
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    res.send("data sent");
    //here by default for 200 http status code is sent
  } else {
    res.status(401).send("unauthorized request");
  }
});

app.get("/admin/delete/user", (req, res) => {
  //check if the request is authorised same again as above
  res.send("deleted a user");
});

//so if i have to put authorization to all the apis, i have to put the same code in all the apis, this is where middleware comes into the picture
//how we can simplify this using middleware
//handle auth middleware for all request, get, post etc...
app.use("/admin", (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("unauthorized request");
  } else {
    next();
  }
});

app.get("/admin/getData", (req, res) => {
  res.send("data sent");
});
//this is why we use middlewares

app.listen(3000, () => {
  console.log("server is succesfully listening on port 3000");
});
