const Bid = require("../models/bid");
const {validationResult} = require("express-validator")

exports.saveNewBid = async (req,res) => {
    const {phone_number,product_id,seller_id,buyer_id,text} = req.body;
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(401).json({isSucess : false, message : error.array()[0].message})
    }

    try {

        if(seller_id.toString() === req.userId.toString()) {
            throw new Error("Authorization failed.")
        }

        await Bid.create({product_id,seller_id,phone_number,buyer_id,text});

        return res.status(201).json({isSucess : true, message : "Bid created successfully."})
    } catch (error) {
        return res.status(401).json({isSucess : false , message : error.message})
    }
}

// get all bids
exports.getAllBids = async (req,res) => {
    const {product_id } = req.params;
    try {
        const bidDoc = await Bid.find({product_id}).populate("buyer_id", "name").select("buyer_id text phone_number createdAt").sort({createdAt : -1})
        if(!bidDoc) {
            throw new Error("No bid found.")
        }
        return res.status(201).json({isSucess : true , bidDoc ,message : "All bids."})
    } catch (error) {
        return res.status(500).json({isSucess : false, message : error.emssage})
    }
}