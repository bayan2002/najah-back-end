const { serverErrs } = require("../helpers/customError");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return next(serverErrs.UNAUTHORIZED("Unauthorized: No token provided"));
    } else {
      const token = authHeader.split(" ")[1];

      if (!token) {
        return next(serverErrs.UNAUTHORIZED("Unauthorized: Invalid format"));
      } else {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
      }
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(serverErrs.UNAUTHORIZED("Token expired"));
    }
    if (
      error instanceof jwt.JsonWebTokenError
      //   &&
      //   error.message === "jwt malformed"
    ) {
      return next(serverErrs.UNAUTHORIZED("Invalid token"));
    }
    next(error);
  }
};

module.exports = verifyToken;
