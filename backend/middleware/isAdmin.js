const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const userId = req.userId;
    const userDoc = await User.findById(userId).select("role");
    if (userDoc.role !== "admin") {
      throw new Error("Unauthorized admin.");
    }
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message, isSuccess: false });
  }
};
