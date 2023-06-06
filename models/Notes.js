const mongoose=require("mongoose")
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
    },
    imagePath:{
        type:String,
        default:"https://res.cloudinary.com/dcl6c7qan/image/upload/v1684927852/cld-sample-2.jpg"
    },
    title:{
        type:String,
        required:true
    },
   description:{
        type:String,
        required:true
       
    },
   tag:{
        type:String,
        default:"General"
    },
   date:{
        type:Date,
        default:Date.now
    }
  });

  const Notes=mongoose.model('note',NotesSchema);
  module.exports=Notes;