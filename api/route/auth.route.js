import express from "express";
import { login,logout,register } from "../controllers/auth.controller.js";
const authroute = express.Router();

authroute.post("/register", register );

authroute.post("/login",login);

authroute.post("/logout",logout);

export default authroute;