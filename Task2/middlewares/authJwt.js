const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

authJwt = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    console.log("No TOKEN");
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log("Eroare TOKEN");
      return res.status(401).send({ message: "Unauthorized!" });
    }
    else{
      console.log("CU TOKEN");
      next();
    }
  });
};
module.exports = authJwt;