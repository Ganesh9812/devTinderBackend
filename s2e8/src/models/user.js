const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      //email id will be stored in lower case whatever user enters
      trim: true,
      //not to have spaces in the emailid before or after,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is not valid" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validator(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("password is not strong");
        }
      },
    },
    age: {
      type: String,
      min: 18,
    },
    gender: {
      type: String,
      //we can also add a custom validation function
      //by default validate works only with new document and not with existing document update
      //so will not work with patch or update, to make this happen.. add runValidators: true in the patch api
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid photo url");
        }
      },
    },
    about: {
      type: String,
      default: "this is default about",
    },
    skills: {
      type: [String],
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);

//name always capitalized so that it says like it is mongoose model
//whenever we create mongodb database we create collection inside it
//using this model ill create new instances of the model for any new user
//now we can create an api to add user into the db
