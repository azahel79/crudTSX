import mongoose, { model } from "mongoose";




const  authModel = new mongoose.Schema({
     username: {
        type: String,
        required: true,
        trim: true
     },
     email:{
         type: String,
         required: true,
         trim: true,
       
     },
     password: {
        type:String,
        required: true,
        trim: true
     },
     createdAt: {
        type: Date,
        default: Date.now()
     }
});

export default model("auths",authModel);
