import app from "express";
import { createNotes, deleteNote, getNotes, updateNote, updateNoteState } from "../controllers/crudControllers.js";
import { verifyToken } from "../helpers/tokensApp.js";


const crudRouter = app.Router();

crudRouter.get("/",verifyToken,getNotes);
crudRouter.post("/create",verifyToken,createNotes);
crudRouter.put("/update/:id",verifyToken,updateNote);
crudRouter.put("/updateState/:id",verifyToken,updateNoteState);
crudRouter.delete("/delete/:id",verifyToken,deleteNote);

export default crudRouter;
