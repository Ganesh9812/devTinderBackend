const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("Namaste Pavan");
// });

// app.use("/test", (req, res) => {
//   res.send("hello from server");
// });

// app.use("/hello", (req, res) => {
//   res.send("hello hello server");
// });

// app.get("/user", (req, res) => {
//   res.send("hello");
// });

// app.post("/test", (req, res) => {
//   console.log("save data to the database");
//   res.send("data succesfully saved to the database");
// });

app.get("/abc", (req, res) => {
  res.send("response");
});

app.listen(3000, () => {
  console.log("server is succesfully listening on port 3000");
});
