let routes = require("express").Router();
let Order = require("../models/Order")
let jwt = require("jsonwebtoken");
let KEY = require("../config/JWTAccessKey");
let rand = require("unique-string-generator")

routes.post("/", async(req, res)=>{
    

    let token = req.headers.authorization;
    let userobj = jwt.decode(token, KEY);

    let insertobj = { 
        invoice_id : rand.UniqueNumber(10),
        product_id : req.body.product_id,
        contact : req.body.contact,
        address : req.body.address,
        user_id : userobj.id,
        mode : req.body.mode,
    }
    // console.log(insertobj);
    let result = await Order.create(insertobj);
    res.send(result);
})


routes.get("/user", async(req, res)=>{
    let token = req.headers.authorization;
    let userobj = jwt.decode(token, KEY);
    let result = await Order.find({user_id : userobj.id}).populate("product_id").exec();
    res.send(result);
})

module.exports = routes;