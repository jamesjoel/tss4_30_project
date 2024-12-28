require("../config/conn");

let mongoose = require("mongoose");

let CateSchema = mongoose.Schema({
    name : String
})

module.exports = mongoose.model("category", CateSchema);