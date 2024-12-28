const express = require("express");
const app = express();
const cors = require("cors");
const upload = require("express-fileupload");

app.use(express.static(__dirname+"/assets"));


// this folder is used for live server
// ----------------- LIVE SERVER ----------------
const root = require("path").join(__dirname, "dist");
app.use(express.static(root));
// ----------------- LIVE SERVER ----------------
// localhost:3000/product-imagse/name.jpg

app.use(upload());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use(require("./allRoutes/AllRoutes"));


app.get("*", (req, res)=>{
    res.sendFile("index.html", {root});
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("server running with port ", port);
})

