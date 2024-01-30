import { request, response } from "express";
import authModels from "../models/authModels.js";
import {compare, hash} from "bcrypt"
import { createToken } from "../helpers/tokensApp.js";


export const  authGetUser = async(req = request,res = response)=>{
   try {
//   OBTENER EL USUARIO
   const userFind = await authModels.findById(req.user.uid);
   console.log(userFind);

      res.status(200).json({msg: "usuario obtenido",user: userFind});
   } catch (error) {
       return res.status(500).json({msg: "hubo un error",error})
   }
}

export const  authLoginUser = async(req = request,res = response)=>{
    try {

         // VERIFICAR SI YA EXISTE ESTE USUARIO
      const verifyUserFind = await authModels.findOne({email: req.body.email});

      if(!verifyUserFind) return res.status(400).json({msg: "este usuario no existe"})

    //   VERIFICAR SI LA CONTRASEÑA ES CORRECTA;
      const passwordVerify = await compare(req.body.password,verifyUserFind.password);

      if(!passwordVerify) return res.status(400).json({msg: "contraseña incorrecta"})


    const token = await createToken({uid: verifyUserFind._id});
       res.status(200).json({msg: "usuario logeado",user: verifyUserFind, token});
    } catch (error) {
        return res.status(500).json({msg: "hubo un error",error})
    }
 }

 export const  autRegisterUser = async(req = request,res = response)=>{

    const {password} = req.body;
    try {

    // VERIFICAR SI YA EXISTE ESTE USUARIO
      const verifyUserFind = await authModels.findOne({email: req.body.email});

      if(verifyUserFind) return res.status(400).json({msg: "este usuario ya existe"})

          // password hash
     const passwordHash = await hash(password,10);
      req.body.password = passwordHash; 
    // CREAR USUARIO
     const newUser = new authModels(req.body);
     await newUser.save();
    const token = await createToken({uid:newUser._id});
       res.status(200).json({msg: "usuario registrado",user: newUser,token});
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "hubo un error",error})
       
    }
 }