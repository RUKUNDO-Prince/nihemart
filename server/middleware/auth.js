const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(req.user);
    next();
  } else {
    return res.status(401).send("You must be logged in to access this routes");
  }
};

const filterUser = (types) => async (req, res, next) => {
  if (!types.includes(req.user.type)) {
    return res.status(403).send("You have no access ...");
  }

  next();
};

module.exports = {
  protect,
  filterUser,
};
