let routes = require("express").Router();
let User = require("../models/User")
let jwt = require("jsonwebtoken");
const KEY = require("../config/JWTAccessKey");
let sha1 = require("sha1");

routes.get("/profile", async(req, res)=>{
    console.log("*********");
    console.log(req.headers)
    let token = req.headers.authorization;
    let userobj = jwt.decode(token, KEY);
    let result = await User.find({ _id : userobj.id });
    res.send(result);
})


routes.put("/update", async(req, res)=>{
    let token = req.headers.authorization;
    let userobj = jwt.decode(token, KEY);
    let result = await User.updateMany({ _id : userobj.id }, req.body);
    res.send(result);
})

routes.post("/changepassword", async(req, res)=>{
    let token = req.headers.authorization;
    let userobj = jwt.decode(token, KEY);
    let user = await User.find({_id : userobj.id});
    if(user[0].password == sha1(req.body.currentpass))
    {
        await User.updateMany({ _id : userobj.id }, { password : sha1(req.body.newpass) })
        res.send({success:true});

    }
    else{
        res.send({success:false});
    }
    
})

module.exports = routes;