import { request, response } from "express"
import authModels from "../models/authModels.js";
import crudModels from "../models/crudModels.js";
import { isValidObjectId } from "mongoose";

export const getNotes = async(req= request,res = response)=>{
    try {
        const verifyUser = await authModels.findById(req.user.uid);
    // VALIDAMOS SI EXISTE EL USUARIO
       if(!verifyUser) return res.status(500).json({msg: "no existe el usuario y no hay permiso"});
    //   VALIDAMOS SI EL USUARIO ACTUAL ES EL CORRECTO 
       if(verifyUser._id.toString()  !== req.user.uid) return res.status(500).json({msg: "no hay permiso"});

       const getList = await crudModels.find({userId: verifyUser._id});


          res.status(200).json({msg: "obtenemos todas las notas",notes: getList});
    } catch (error) {
          return res.status(500).json({msg: "hubo un error",error});
      
    }
}

export const createNotes = async(req= request,res = response)=>{
    try {

       const verifyUser = await authModels.findById(req.user.uid);

    // VALIDAMOS SI EXISTE EL USUARIO
       if(!verifyUser) return res.status(500).json({msg: "no existe el usuario y no hay permiso"});


    //   VALIDAMOS SI EL USUARIO ACTUAL ES EL CORRECTO 
       if(verifyUser._id.toString()  !== req.user.uid) return res.status(500).json({msg: "no hay permiso"});
    //    CREAMOS LA NOTA
       const newNote = new crudModels({
          ...req.body,
          userId: verifyUser._id
       });
          
      await newNote.save();
        res.status(200).json({msg:"creamos la nota",note: newNote});
    } catch (error) {
          return res.status(500).json({msg: "hubo un error",error});
    }
}

export const updateNote = async(req= request,res = response)=>{
    try {

          // VERIDICVAMOS SI ES UN ID VALIDO
          const validateId = isValidObjectId(req.params.id);
          if(!validateId)  return res.status(400).json({msg: "no es un id valido"})

        const verifyUser = await authModels.findById(req.user.uid);
        // VALIDAMOS SI EXISTE EL USUARIO
           if(!verifyUser) return res.status(500).json({msg: "no existe el usuario y no hay permiso"});
        //   VALIDAMOS SI EL USUARIO ACTUAL ES EL CORRECTO 
           if(verifyUser._id.toString()  !== req.user.uid) return res.status(500).json({msg: "no hay permiso"});
        //    VERIFICAMOS SI EXISTE LA NOTA
        const verifyNote = await crudModels.findById(req.params.id);
        if(!verifyNote) return res.status(400).json({msg: "no existe la nota"});
        await crudModels.findByIdAndUpdate(verifyNote._id,req.body);
        res.status(200).json({msg: "actualizamos la nota"})
    } catch (error) {
          return res.status(500).json({msg: "hubo un error",error});
    }
}  

export const updateNoteState = async(req = request,res = response)=>{
  try {
      // VERIDICVAMOS SI ES UN ID VALIDO
      const validateId = isValidObjectId(req.params.id);
      if(!validateId)  return res.status(400).json({msg: "no es un id valido"})

    const verifyUser = await authModels.findById(req.user.uid);
    // VALIDAMOS SI EXISTE EL USUARIO
       if(!verifyUser) return res.status(500).json({msg: "no existe el usuario y no hay permiso"});
    //   VALIDAMOS SI EL USUARIO ACTUAL ES EL CORRECTO 
       if(verifyUser._id.toString()  !== req.user.uid) return res.status(500).json({msg: "no hay permiso"});
    //    VERIFICAMOS SI EXISTE LA NOTA
    const verifyNote = await crudModels.findById(req.params.id);
    if(!verifyNote) return res.status(400).json({msg: "no existe la nota"});

   if(verifyNote.state){
    await crudModels.findByIdAndUpdate(verifyNote._id,{state: false}); 
   }else{
    await crudModels.findByIdAndUpdate(verifyNote._id,{state: true}); 
   }

    res.status(200).json({msg: "se actualizo el estado"})

  } catch (error) {
    return res.status(500).json({msg: "hubo un error",error});
  }
}



export const deleteNote = async(req= request,res = response)=>{
    try {

        // VERIDICVAMOS SI ES UN ID VALIDO
        const validateId = isValidObjectId(req.params.id);
        if(!validateId)  return res.status(400).json({msg: "no es un id valido"})


        const verifyUser = await authModels.findById(req.user.uid);
        // VALIDAMOS SI EXISTE EL USUARIO
           if(!verifyUser) return res.status(500).json({msg: "no existe el usuario y no hay permiso"});
        //   VALIDAMOS SI EL USUARIO ACTUAL ES EL CORRECTO 
           if(verifyUser._id.toString()  !== req.user.uid) return res.status(500).json({msg: "no hay permiso"});
        //    VERIFICAMOS SI EXISTE LA NOTA
        const verifyNote = await crudModels.findById(req.params.id);
        if(!verifyNote) return res.status(400).json({msg: "no existe la nota"});

        
        await  crudModels.findByIdAndDelete(verifyNote._id);

        res.status(200).json({msg:"eliminamos la nota"});

    } catch (error) {

        console.log(error);
          return res.status(500).json({msg: "hubo un error",error});
    }
}


