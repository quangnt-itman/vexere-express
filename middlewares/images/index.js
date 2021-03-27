const multer = require("multer")

// type: avatar, coach
module.exports.uploadImage = (type) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../../images/${type}s`)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })

  const upload = multer({ storage })
  return upload.single(type) // MDW (req, res, next)
}