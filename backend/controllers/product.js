const { validationResult } = require("express-validator");
const Product = require("../models/product");
const SaveProduct = require("../models/saveproducts");
const Notification = require("../models/notification");
require("dotenv").config();

const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "dyzhvekwq",
  api_key: "682466589398166",
  api_secret: process.env.CLOUD_API,
});

// create post
exports.addNewProduct = async (req, res) => {
  const error = validationResult(req);
  const { category, description, details, name, price, usedFor } = req.body;
  if (!error.isEmpty()) {
    return res
      .status(422)
      .json({ isSucess: false, message: error.array()[0].msg });
  }

  try {
    const productDoc = await Product.create({
      name,
      details,
      description,
      usedFor,
      price,
      category,
      seller: req.userId,
    });
    return res.status(201).json({
      isSucess: true,
      message: "Product add to sell list.",
      productDoc,
    });
  } catch (err) {
    return res.status(422).json({ isSucess: false, message: err.message });
  }
};

// get all products
exports.getAllProducts = async (req, res) => {
  const page = req.query.productList || 1;
  const limit = 10;

  try {
      const totalProduct = await Product.find({seller :req.userId}).countDocuments();
       const products = await Product.find({ seller: req.userId }).sort({ 
          createdAt: -1,
        }).skip((page -1) * limit).limit(limit);
       return res.status(200).json({ isSucess: true, products,limit,totalProduct });

      // } else {
      //   products = await Product.find().sort({ 
      //     createdAt: -1,
      //   });
      //   return res.status(200).json({ isSucess: true, products });
      // }

  } catch (err) {
    return res.status(422).json({ isSucess: false, message: err.message });
  }
};

// get old product
exports.getOldProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById({ _id: id });
    return res.status(201).json({ isSucess: true, product });
  } catch (error) {
    return res.status(422).json({ isSucess: false, message: err.message });
  }
};

// update product
exports.updateProduct = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(422)
      .json({ isSucess: false, message: error.array()[0].msg });
  }

  const id = req.params.id;
  const { category, description, details, name, price, usedFor, seller_id } =
    req.body;

  try {
    if (req.userId.toString() !== seller_id) {
      throw new Error("Authorization Failed.");
    }
    const product = await Product.findById({ _id: id });
    if (product) {
      product.name = name;
      product.category = category;
      product.description = description;
      if (details) {
        product.details = details;
      }
      product.price = price;
      product.usedFor = usedFor;
      await product.save();
    }
    return res.status(201).json({
      isSucess: true,
      message: "Product edit successful.",
      product,
    });
  } catch (error) {
    return res.status(422).json({ isSucess: false, message: error.message });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {

    const product = await Product.findById({ _id: id });

    if (!product) {
      return res.status(404).json({
        isSucess: false,
        message: "Product not found.",
      });
    }

    if (req.userId.toString() !== product.seller.toString()) {
      throw new Error("Authentication Failed.");
    }

    // public key xvilu5bve9rmzscty2xp
    //https://res.cloudinary.com/dyzhvekwq/image/upload/v1708249916/xvilu5bve9rmzscty2xp.jpg

    if (product.images && Array.isArray(product.images)) {
      const deletePromise = product.images.map((img) => {
        const publicId = img.substring(
          img.lastIndexOf("/") + 1,
          img.lastIndexOf(".")
        );

        return new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (err, result) => {
            if (err) {
              reject(new Error("Destroy Failed."));
            } else {
              resolve(result);
            }
          });
        });
      });
      await Promise.all(deletePromise);
    }

    await Product.deleteOne({ _id: id });
    return res.status(201).json({
      isSucess: true,
      message: "Product delete successful.",
    });
  } catch (error) {
    return res.status(422).json({ isSucess: false, message: error.message });
  }
};

// upload product image
exports.uploadProductImages = async (req, res) => {
  const { product_id } = req.body;
  const productImages = req.files;

  let secureUrlArray = [];

  const product = await Product.findById({ _id: product_id});

  if (req.userId.toString() !== product.seller.toString()) {
    throw new Error("Authentication Failed.");
  }

  try {
    productImages.forEach((img) => {
      cloudinary.uploader.upload(img.path, async (err, result) => {
        if (!err) {
          const url = result.secure_url;
          secureUrlArray.push(url);
          if (productImages.length === secureUrlArray.length) {
            await Product.findByIdAndUpdate(
              { _id: product_id },
              { $push: { images: secureUrlArray } }
            );
            return res.status(201).json({
              isSucess: true,
              message: "Product Image Upload Successful.",
              secureUrlArray,
            });
          }
        } else {
          throw new Error("Cloud Upload Failed.");
        }
      });
    });
  } catch (error) {
    return res.status(404).json({ isSucess: false, message: error.message });
  }
};

// get saved product images
exports.getSavedProductImages = async (req, res) => {
  const productId = req.params.id;
  try {
    const productDoc = await Product.findById(productId).select("images seller");

    if (req.userId.toString() !== productDoc.seller.toString()) {
      throw new Error("Authentication Failed.");
    }

    if (!productDoc) {
      throw new Error("Product not found.");
    }
    return res.status(201).json({
      isSucess: true,
      message: "Product Images .",
      data: productDoc,
    });
  } catch (err) {
    return res.status(404).json({ isSucess: false, message: err.message });
  }
};

// delete product images
exports.deleteProductImages = async (req, res) => {
  const productId = req.params.productId;
  const decodeImgToDelete = req.params.imgToDelete;

  try {
    const productDoc = await Product.findById(productId).select("seller");

    if (req.userId.toString() !== productDoc.seller.toString()) {
      throw new Error("Authentication Failed.");
    }

    await Product.findByIdAndUpdate(productId, {
      $pull: { images: decodeImgToDelete },
    });

    const publicId = decodeImgToDelete.substring(
      decodeImgToDelete.lastIndexOf("/") + 1,
      decodeImgToDelete.lastIndexOf(".")
    );

    await cloudinary.uploader.destroy(publicId);

    return res.status(201).json({
      isSucess: true,
      message: "Image destroyed successfully.",
    });
  } catch (err) {
    return res.status(404).json({ isSucess: false, message: err.message });
  }
};

// saved products
exports.savedProducts = async (req,res) => {
  const {id} = req.params;

  try {
    const getSaveProduct = await SaveProduct.findOne({$and : [{product_id : id},{user_id : req.userId}]});

    if(getSaveProduct) {
      return res.status(201).json({isSucess : true , message : "Product have already saved."})
    }
    const productDoc = await SaveProduct.create({
      user_id : req.userId,
      product_id : id,
    })

    if(!productDoc) {
      throw new Error("Product not save.")
    }

    return res.status(201).json({isSucess : true, message : "Product Saved Successfully."})
  } catch (error) {
    return res.status(401).json({isSucess : false, message : error.message})
  }
}

// get saved products
exports.getSavedProducts = async (req,res) => {

  try {
    const productDoc = await SaveProduct.find({user_id : req.userId}).populate("product_id","category name images description price");

    if(!productDoc) {
      throw new Error("Product not found.")
    }

    return res.status(201).json({isSucess : true, productDoc, message : "Products saved "})
  } catch (error) {
    return res.status(401).json({isSucess : false, message : error.message})
  }
}

// unsaved product
exports.unSavedProducts = async (req,res) => {
  const {productId} = req.params;
  try {
    const productDoc = await SaveProduct.findOneAndDelete({product_id : productId});
    if(!productDoc) {
      throw new Error("Product saved not found")
    }

    return res.status(201).json({isSucess : true, message : "Unsaved product from list."})
  } catch (error) {
    return res.status(401).json({isSucess : false, message : error.message})
  }
}

// pending product
exports.pendingProducts = async (req,res) => {
  try {
    const productDoc = await Product.find({status : "pending"});
    if(!productDoc) {
      throw new Error("Product saved not found")
    }
    return res.status(201).json({isSucess : true, productDoc, message : "Pending products."})
  } catch (error) {
    return res.status(401).json({isSucess : false, message : error.message})
  }
}

