const validator = require("validator");
const { User } = require("../../../models/user.model");
const _ = require("lodash");

module.exports.validateCreateUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const fullName = req.body.fullName

  const errors = {}

  // email
  if (!email) {
    errors.email = "Email is required"
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is invalid"
  } else {
    const user = await User.findOne({ email })
    if (user) errors.email = "Email exists"
  }

  // password
  if (!password) {
    errors.password = "Password is required"
  }

  // password 2
  if (!password2) {
    errors.password2 = "Confirmed password is required"
  } else if (!validator.equals(password, password2)) {
    errors.password2 = "Password must match"
  }

  // fullName
  if (!fullName) {
    errors.fullName = "Full name is required"
  }

  if (Object.keys(errors).length > 0) return res.status(400).json(errors)

  return next()
}