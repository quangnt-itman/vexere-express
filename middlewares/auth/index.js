const jwt = require("jsonwebtoken");
const util = require("util");
const config = require("../../config")

const jwtVerify = util.promisify(jwt.verify)
module.exports.authenticate = (req, res, next) => {
  const token = req.headers.token

  jwtVerify(token, config.JWT_SECRET_KEY)
    .then(decoded => {
      if (!decoded) return res.status(401).json({
        message: "Token is invalid"
      })

      // decoded = payload
      req.user = decoded
      return next()
    })
    .catch(err => res.json(err))
}

module.exports.authorize = userTypeArray => {
  return (req, res, next) => {
    const user = req.user;
    if (userTypeArray.indexOf(user.userType) > -1) return next();

    res.status(403).json({ message: "You do not have permission" })
  }
}

// module.exports.authorize = userTypeArray => (req, res, next) => {
//   const user = req.user;
//   if (userTypeArray.indexOf(user.userType) > -1) return next();

//   res.status(403).json({ message: "You do not have permission" })
// }