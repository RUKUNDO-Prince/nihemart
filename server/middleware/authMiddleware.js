const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Authenticate middleware error:", error);
    return res.status(401).json({ message: "Unauthorised" });
  }
};

// uploading the image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { authenticate, upload };
