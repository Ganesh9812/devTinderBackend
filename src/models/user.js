const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);

//name always capitalized so that it says like it is mongoose model
//whenever we create mongodb database we create collection inside it
//using this model ill create new instances of the model for any new user
//now we can create an api to add user into the db
