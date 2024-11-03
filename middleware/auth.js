const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: "unauthorized access you cannot provide valid information",
    });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: "unauthorized access token cannot find" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "unauthorized access token not veryfied" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
