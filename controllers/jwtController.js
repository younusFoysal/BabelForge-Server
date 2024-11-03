const jwt = require("jsonwebtoken");

const jwtdocs = async (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  // Create a JWT token with the email as the payload
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "365d",
  });

  // Send the response
  return res.status(200).json({ success: true, token });
};

module.exports = { jwtdocs };
