const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter the strong password");
  }
};

//here i dont want my user to edit everything

const validateProfileEditData = (req) => {
  console.log(req.body, "req");
  const allowedFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((key) => {
    return allowedFields.includes(key);
  });
  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateProfileEditData,
};
