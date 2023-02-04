const mongoose=require("mongoose");
const mongoURI=REACT_APP_MONGO_URI

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected To Mongo Successfully")
    })
}

module.exports=connectToMongo;