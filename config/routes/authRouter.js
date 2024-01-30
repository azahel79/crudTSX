import app from "express";
import { autRegisterUser, authGetUser, authLoginUser } from "../controllers/authControllers.js";
import { verifyToken } from "../helpers/tokensApp.js";

export const authRouter = app.Router();


authRouter.get("/user",verifyToken,authGetUser);
authRouter.post("/login",authLoginUser);
authRouter.post("/register",autRegisterUser);

