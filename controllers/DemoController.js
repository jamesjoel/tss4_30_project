require("../config/conn");

let mongoose = require("mongoose");
let routes = require("express").Router();

let CountrySchema = mongoose.Schema({
    name : String,
    id : Number
}, {collection : "temp_country"});
let Country = mongoose.model("country", CountrySchema);


let StateSchema = mongoose.Schema({
    name : String,
    id : Number,
    country_id : Number
}, {collection : "temp_state"});
let State = mongoose.model("state", StateSchema);


let CitySchema = mongoose.Schema({
    name : String,
    id : Number,
    state_id : Number
}, {collection : "temp_city"});
let City = mongoose.model("city1", CitySchema);



routes.get("/", async(req, res)=>{
    let country_result = await Country.find();
    let result = await Promise.all(country_result.map(async(item1)=>{
        let cid = item1.id;
        let state_result = await State.find({country_id:cid});


        let result2 = await Promise.all(state_result.map(async(item2)=>{
            let sid = item2.id;

            let city_result = await City.find({state_id:sid});

            return { name : item2.name, city_data : city_result };

        }))

        return { name : item1.name, state_data : result2 };

    }));
    res.send(result)
})

module.exports = routes;


/*

   Promise.all(arr.map(async(item)=>{
        let res1 = await axios.get("url")
        let res2 = await axios.get("url")
        let res3 = await axios.get("url")
        })
    );
    



*/
