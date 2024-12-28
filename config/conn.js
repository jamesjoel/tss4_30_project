// const connection_string = "mongodb://0.0.0.0:27017/tss6_project"
const connection_string = "mongodb+srv://jamessteppingstone:Img4N6WutoEiiTkB@cluster0.ww9rq.mongodb.net/"



require("mongoose").connect(connection_string)
.then(()=>{
    console.log("CONNECTED")
})
.catch((err)=>{
    console.log("NOT-CONNECTED ", err);

})


async function DbConnect()
{
    await require("mongoose").connect(connection_string)
}

DbConnect();


// username : jamessteppingstone
// password : Img4N6WutoEiiTkB