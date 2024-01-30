import express from "express"
import dotenv  from "dotenv";
import cors from "cors";
import MongoDB from "../db/dbApp.js";
import { authRouter } from "../routes/authRouter.js";
import crudRouter from "../routes/crudRouter.js";



export default class App{
      constructor(){
          this.app = express();
          dotenv.config();
      }  

      controllers(){
           this.app.set("port",process.env.PORT);
      }
      middlewares(){
          this.app.use(express.json());
          this.app.use(express.urlencoded({extended: false}));
          this.app.use(cors());
      }
      routes(){
           this.app.use("/api/auth",authRouter);
           this.app.use("/api/crud", crudRouter);
      }
      
      conectedDB(){
       MongoDB();
      }
  
      listen(){
          this.app.listen(this.app.get("port"),()=>{
              console.log(`server in  port ${this.app.get("port")}`)
          })
      }
}