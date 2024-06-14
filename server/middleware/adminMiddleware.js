const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.isAdmin) {
     return res.status(401).json({ message: "your're not the admin" });
    }
    req.user = decodedToken.id;
    next();
  } catch (error) {
    console.error("middleware error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { adminMiddleware };
