let routes = require("express").Router();
let User = require("../models/User");
let sha1 = require("sha1")
let jwt = require("jsonwebtoken");
const KEY = require("../config/JWTAccessKey");

routes.post("/", async(req, res)=>{
    let e = req.body.email; // rohit@gmail.com
    let p = req.body.password; // 123
    let result = await User.find({email:e}); // []
    if(result.length > 0)
    {
        if(result[0].password == sha1(p))
        {
            if(result[0].status==true){

                let userobj = { id : result[0]._id, email : result[0].email }
                let token = jwt.sign(userobj, KEY);
                res.send({success:true, token : token, name : result[0].name });
            }else{

                res.send({ success : false, errType : 3 })
            }
        }
        else{

            res.send({ success : false, errType : 2 })
        }
    }
    else{
        res.send({ success : false, errType : 1 })
    }
})

module.exports = routes;