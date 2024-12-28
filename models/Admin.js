require("../config/conn");

let mongoose = require("mongoose");

let AdminSchema = mongoose.Schema({
    username : String,
    password : String
})

module.exports = mongoose.model("admin", AdminSchema);