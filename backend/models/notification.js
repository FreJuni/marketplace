const {model,Schema} = require("mongoose")
const notofactionSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true,
    },
    owner_id : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User",
    },
    product_id :
    {
        type : String,
        required : true
    },
    isRead : {
        type : Boolean,
        default : false,
    },
    phone_number : {
        type : String,
        required : true
    }
   },
    {
        timestamps : true
    }
)

module.exports = model("Notification", notofactionSchema);