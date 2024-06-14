const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.id;
    next();
  } catch (error) {
    console.error("Authenticate middleware error:", error);
    return res.status(401).json({ message: "Unauthorised" });
  }
};

module.exports = { authenticate };

// const jwt = require("jsonwebtoken");

// const authenticate = (req, res, next) => {
//   const token = req.cookies.token;
//   if (token) {
//     try {
//       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decodedToken.id;
//       next();
//     } catch (error) {
//       console.log("Authenticate middleware error");
//       console.error(error);
//       // Token is invalid, but proceed to the next middleware
//       req.user = null;
//       next();
//     }
//   } else {
//     // No token provided, proceed without authentication
//     req.user = null;
//     next();
//   }
// };

// module.exports = { authenticate };
