const Product = require("../models/product");

// get all products
exports.getAllProducts = async (req,res) => {
    const limitPage = 6;
    const page = req.query.page || 1;

    try {
        const totalProduct = await Product.find({status : "approve"}).countDocuments();
        const productDoc = await Product.find({status : "approve"}).sort({createdAt : -1}).limit(limitPage).skip((page -1) * limitPage);
        return res.status(200).json({isSucess : true, productDoc,limitPage,totalProduct})
    } catch (error) {
        return res.status(401).json({isSucess : false, message : error.message})
    }
};


// get all approve products
exports.getApproveProduct = async (req,res) => {

    try {
        const productDoc = await Product.find({status : "approve"}).sort({createdAt : -1})
        return res.status(200).json({isSucess : true, productDoc})
    } catch (error) {
        return res.status(401).json({isSucess : false, message : error.message})
    }
};

// get product by filter
exports.getProductByFilter = async (req,res) => {
    const {searchKey,category} = req.query;

    try {
        const productDoc = await Product.find(searchKey ?{name : {$regex : searchKey, $options : "i"},status : "approve" } : {category : category,status : "approve" })

        if(!productDoc || productDoc.length === 0) {
            throw new Error("Product not found.")
        }

        return res.status(201).json({isSucess : true, productDoc})
    } catch (error) {
        return res.status(404).json({isSucess : false,message : error.message})
    }
}

// product details
exports.productDetail = async (req,res) => {
    const {productId} = req.params;
    try {
        const productDoc = await Product.findById(productId).populate("seller","email name")
        if(!productDoc) {
            res.status(401).json({isSucess : false, message : "Prodcut not found."})
        }
        return res.status(201).json({isSucess : true, productDoc});
    } catch (error) {
        res.status(401).json({isSucess : false, message : error.message})
    }
}