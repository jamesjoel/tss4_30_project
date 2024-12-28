require("../config/conn");

let mongoose = require("mongoose");

let CitySchema = mongoose.Schema({
    id : String,
    name : String,
    state : String
}, {collection : "city"})

module.exports = mongoose.model("city", CitySchema);