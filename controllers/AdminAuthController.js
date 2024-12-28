const routes = require("express").Router();
const Admin = require("../models/Admin")
const sha1 = require("sha1");
const jwt = require("jsonwebtoken");
const KEY = require("../config/JWTAccessKey");

routes.post("/", async(req, res)=>{
    let {username, password}= req.body;
    let result = await Admin.find({username : username});
    if(result.length > 0)
    {
        if(result[0].password == sha1(password))
        {
            let obj = {id : result[0]._id, username : result[0].username}
            let token = jwt.sign(obj, KEY);
            // res.status(200).json({ success : true, token : token });
            res.send({ success : true, token : token });
        }
        else{

            res.status(401).json({ success : false, errType : 2 });
            // res.send({ success : false, errType : 2 });
        }
    }
    else{
        res.status(401).json({ success : false, errType : 1 });
        // res.send({ success : false, errType : 1 });
    }
})

module.exports = routes;