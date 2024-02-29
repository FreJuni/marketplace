const { Schema, model } = require("mongoose");

const saveProduct = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref : "User"
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref : "Product",
    }
  }
);

module.exports = model("SaveProduct", saveProduct);
