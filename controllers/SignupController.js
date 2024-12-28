const routes = require("express").Router();
const User = require("../models/User")
const sha1 = require("sha1")

routes.post("/", async(req, res)=>{
     delete req.body.repassword;

     req.body.password = sha1(req.body.password);

     let result = await User.create(req.body);
     res.send({success : true, result});
})

routes.get("/checkusername/:a", async(req, res)=>{
     let x = req.params.a;
     let result = await User.find({ email : x});
     if(result.length == 0)
     {
          res.send(true);
     }
     else{
          res.send(false);
     }
})

module.exports = routes;