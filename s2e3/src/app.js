const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Namaste Pavan");
});

app.use("/test", (req, res) => {
  res.send("hello from server");
});

app.use("/hello", (req, res) => {
  res.send("hello hello server");
});

app.listen(3000, () => {
  console.log("server is succesfully listening on port 3000");
});
