require("../config/conn");

let mongoose = require("mongoose");

let SubCateSchema = mongoose.Schema({
    name : String,
    categoryid : { type : mongoose.Schema.Types.ObjectId, ref : "category"  }
})

module.exports = mongoose.model("subcategory", SubCateSchema);