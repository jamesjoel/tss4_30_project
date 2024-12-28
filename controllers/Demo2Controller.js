let routes = require("express").Router();

routes.post("/", (req, res)=>{
    let file = req.files.hello;
    file.mv("E:/tss6-new/project/api/assets/temp/"+file.name, (err)=>{
        if(err){
            console.log(err);
        }
    });
})

module.exports = routes;