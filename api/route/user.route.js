import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { updateUser,getUser,getUsers,deleteUser } from "../controllers/user.controller.js";
const userroute = express.Router();

userroute.get("/", getUsers );

userroute.get("/:id",verifyToken ,getUser);

userroute.put("/:id",verifyToken ,updateUser);

userroute.delete("/:id",verifyToken,deleteUser);


export default userroute;