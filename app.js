const express = require("express");
const app = express();
const cors = require("cors");
const upload = require("express-fileupload");

app.use(express.static(__dirname+"/assets"));

// localhost:3000/product-imagse/name.jpg

app.use(upload());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use(require("./allRoutes/AllRoutes"));

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("server running with port ", port);
})

