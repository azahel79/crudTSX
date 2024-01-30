import mongoose,{ model} from "mongoose";



const crudModels = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    state: {
        type: Boolean,
        default: false
    },
    userId:{
        type: mongoose.Schema.ObjectId,
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})



export default model("cruds",crudModels);