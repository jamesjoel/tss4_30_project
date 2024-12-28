let routes = require("express").Router();
let Product = require("../models/Product")
let path = require("path");
let rand = require("unique-string-generator")


routes.get("/", async(req, res)=>{
    // console.log(req.headers);
    let result = await Product.find().populate("category").populate("subcategory").exec();
    res.send(result);
})



routes.get("/:id", async(req, res)=>{
    let id = req.params.id;
    let result = await Product.find({_id : id}).populate("category").populate("subcategory").exec();
    res.send(result);
})
routes.post("/", async(req, res)=>{
    // console.log(req.files)
    let str = rand.UniqueString(); // sdfgegergfgergs
    
    let photo = req.files.photo;
    let name = photo.name; // mango.freash.jpg
    let arr = name.split(".")
    let ext = arr[arr.length-1];

    let newname = str+"."+ext;


    let upload_path = path.resolve()+"/assets/product-images/"+newname;
    photo.mv(upload_path, async(err)=>{
        if(err){
            console.log(err);
        }
        req.body.image = newname;
        let result = await Product.create(req.body);
        res.send(result);
    })
    
})
routes.put("/:id", async(req, res)=>{
    let id = req.params.id;
    let result = await Product.updateMany({_id:id}, req.body);
    res.send(result);
})
routes.delete("/:id", async(req, res)=>{
    let id = req.params.id;
    let result = await Product.deleteMany({_id : id});
   res.send(result);
})



module.exports = routes;


/*

 function (){

    function (){
    
        async functionn (){
                await  
        
        }
    
    }

}






*/