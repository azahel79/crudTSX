import mongoose from "mongoose"


 const  MongoDB = ()=>{
    mongoose.connect(process.env.URI).then(res=>{
     console.log("se conecto la base de datos mongoDB");
   }).catch(err=>{
     console.log(err);
     process.exit(1);
   })
}  



export default MongoDB;