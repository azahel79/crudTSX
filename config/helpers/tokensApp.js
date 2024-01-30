import { request, response } from "express";
import jwt from "jsonwebtoken";

export const createToken = (payload)=>{
    const token = jwt.sign(payload,process.env.PRIVATE_KEY,{
        expiresIn: "1h"
     })
     return token;
}


export const verifyToken = async(req = request,res = response,next)=>{ 
     const token = req.header("auth__token");
      if(!token)  return res.status(404).json({msg: "no existe el token"});
    
      try {
          const  user = await jwt.verify(token,process.env.PRIVATE_KEY);
          req.user = user;
          next();
      } catch (error) {
        return res.status(500).json({msg: "token expirado"});
      }
}