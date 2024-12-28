require("../config/conn");
let mongoose = require("mongoose");

let OrderSchema = mongoose.Schema({
    invoice_id : String,
    product_id : { type : mongoose.Schema.Types.ObjectId, ref : "product" },
    user_id : { type : mongoose.Schema.Types.ObjectId, ref : "user" },
    orderdate : {type : Date, default : new Date()},
    mode : String,
    cancle_status : {type : Number, default : 0},
    contact : String,
    address : String
})

let Order = mongoose.model("order", OrderSchema)

module.exports = Order;