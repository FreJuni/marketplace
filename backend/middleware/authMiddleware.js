const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    
    if (!token) {
      throw new Error("Unauthorized.");
    }
    const tokenDetail = jwt.verify(token, process.env.JWT_TOKEN);
    req.userId = tokenDetail.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message, isSuccess: false });
  }
};
