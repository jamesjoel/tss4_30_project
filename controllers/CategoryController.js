let routes = require("express").Router();
let Cate = require("../models/Category")
let SubCate = require("../models/SubCategory")

routes.get("/", async(req, res)=>{
    let result = await Cate.find();
    res.send(result);
})
routes.get("/allcategory", async(req, res)=>{
    let result1 = await Cate.find();
    let result = await Promise.all(result1.map(async(item)=>{
        
        let result2 = await SubCate.find({categoryid:item._id});
        
        return {cateid : item._id, catename:item.name, subcatedata:result2};
    }));
    res.send(result)
})


routes.get("/:id", async(req, res)=>{
    let id = req.params.id;
    let result = await Cate.find({_id : id});
    res.send(result);
})
routes.post("/", async(req, res)=>{
    let result = await Cate.create(req.body);
    res.send(result);
})
routes.put("/:id", async(req, res)=>{
    let id = req.params.id;
    let result = await Cate.updateMany({_id:id}, req.body);
    res.send(result);
})
routes.delete("/:id", async(req, res)=>{
    let id = req.params.id;
    let result = await Cate.deleteMany({_id : id});
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