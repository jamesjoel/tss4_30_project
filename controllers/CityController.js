let routes = require("express").Router();
let City = require("../models/City")
// http://localhost:3000/api/v1/city/getstate

routes.get("/getstate", async(req, res)=>{
    let result = await City.distinct("state");
    res.send(result)
})
// http://localhost:3000/api/v1/city/getcity/MP
routes.get("/getcity/:state", async(req, res)=>{
    let state = req.params.state;
    let result = await City.find({state:state});
    res.send(result)
})

module.exports = routes;