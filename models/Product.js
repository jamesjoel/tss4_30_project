require("../config/conn");

let mongoose = require("mongoose");

let ProSchema = mongoose.Schema({
    title : String,
    price : Number,
    category : {type : mongoose.Schema.Types.ObjectId, ref:"category"},
    subcategory : {type:mongoose.Schema.Types.ObjectId, ref:"subcategory"},
    detail : String,
    discount : Number,
    quantity : Number,
    image : String
})

module.exports = mongoose.model("product", ProSchema);