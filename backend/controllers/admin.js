const Product = require("../models/product");
const User = require("../models/user");

// get all products
exports.getAllProducts = async (req, res) => {
  const page = req.query.productList || 1;
  const limit = 10;

  try {
    const totalProduct = await Product.countDocuments();
    
    const products = await Product.find().populate("seller", "name").sort({
      createdAt: -1,
    }).limit(limit).skip((page -1) * limit);
    return res.status(200).json({ isSucess: true, products,limit,totalProduct });
  } catch (err) {
    return res.status(422).json({ isSucess: false, message: err.message });
  }
};

// approve product
exports.approveProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await Product.findById(id);

    if (!productDoc) {
      throw new Error("Product not found.");
    }

    productDoc.status = "approve";
    await productDoc.save();

    return res
      .status(200)
      .json({ isSucess: true, message: "Product approve successfully." });
  } catch (error) {
    return res.status(422).json({ isSucess: false, message: error.message });
  }
};

// reject product
exports.rejectProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findById(id);

    if (!productDoc) {
      throw new Error("Product not found.");
    }

    productDoc.status = "reject";
    await productDoc.save();

    return res
      .status(200)
      .json({ isSucess: true, message: "Product reject successfully." });
  } catch (error) {
    return res.status(422).json({ isSucess: false, message: error.message });
  }
};

// roll back product
exports.rollBackProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findById(id);

    if (!productDoc) {
      throw new Error("Product not found.");
    }

    productDoc.status = "pending";
    await productDoc.save();

    return res
      .status(200)
      .json({ isSucess: true, message: "Product rollback successfully." });
  } catch (error) {
    return res.status(422).json({ isSucess: false, message: error.message });
  }
};

//get users
exports.getUsers = async (req, res) => {
  try {
    const usersDoc = await User.find()
      .sort({ createdAt: -1 })
      .select("name email role status createdAt");

    if (!usersDoc) {
      throw new Error("Product not found.");
    }

    return res
      .status(200)
      .json({ isSucess: true, message: "All Users.", data: usersDoc });
  } catch (error) {
    return res.status(422).json({ isSucess: false, message: error.message });
  }
};

// ban User
exports.banUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userDoc = await User.findById(id);
    if (!userDoc) {
      throw new Error("Product not found.");
    }

    userDoc.status = "banned";
    await userDoc.save();

    return res.status(200).json({
      isSucess: true,
      message: "Ban user successfully.",
    });
  } catch (error) {
    return res.status(422).json({ isSucess: false, message: error.message });
  }
};

// unban User
exports.unbanUser = async (req, res) => {
  const { id } = req.params;
  try {
    const usersDoc = await User.findById(id);
    if (!usersDoc) {
      throw new Error("Product not found.");
    }

    usersDoc.status = "active";
    await usersDoc.save();

    return res.status(200).json({
      isSucess: true,
      message: "Unban user successfully.",
    });
  } catch (error) {
    return res.status(422).json({ isSucess: false, message: error.message });
  }
};
