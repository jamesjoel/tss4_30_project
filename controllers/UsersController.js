let routes = require("express").Router();
let User = require("../models/User")
routes.get("/", async(req, res)=>{
    let result = await User.find();
    res.send(result)
})
routes.put("/changestatus/:id/:status", async(req, res)=>{

    let id = req.params.id;
    let status = req.params.status;
    let s = status=="true" ? false : true;
    await User.updateMany({_id : id}, {status:s});
    res.send({success:true});
})

module.exports = routes;