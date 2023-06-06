const mongoose=require("mongoose");
const mongoURI=process.env.REACT_APP_MONGO_URI
// const mongoURI="mongodb+srv://root:root022@cluster0.rq55vdi.mongodb.net/inotebook"
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected To Mongo Successfully")
    })
}

module.exports=connectToMongo; 