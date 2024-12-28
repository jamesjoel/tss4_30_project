let routes = require("express").Router();
let SubCate = require("../models/SubCategory");

routes.get("/", async(req, res)=>{
    let result = await SubCate.find().populate("categoryid").exec();
    res.send(result);
})
routes.get("/getsubcatebycateid/:id", async(req, res)=>{
    let id = req.params.id;
    let result = await SubCate.find({ categoryid : id }).populate("categoryid").exec();
    res.send(result);
})
routes.get("/:id", async(req, res)=>{
    let id = req.params.id;
    let result = await SubCate.find({_id:id});
    res.send(result);
})
routes.post("/", async(req, res)=>{
    let result = await SubCate.create(req.body);
    res.send(result);
})
routes.put("/:id", async(req, res)=>{
    let id = req.params.id;
    let result = await SubCate.updateMany({_id : id}, req.body);
    res.send(result);
})
routes.delete("/:id", async(req, res)=>{
    let id = req.params.id;
    let result = await SubCate.deleteMany({_id:id});
    res.send(result);
})

module.exports = routes;
