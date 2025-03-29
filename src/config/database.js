const mongoose = require("mongoose");

//here we are connecting to the cluster

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ganeshpavankumars:cOeeng04sYTtEKA9@namastenode.yqrkb.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
