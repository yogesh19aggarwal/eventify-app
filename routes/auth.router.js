import express from "express";
import { generateToken, login, logout } from "../controller/auth.controller.js";

const router = express.Router();

router.get("/login", login);

router.get("/oauth2callback", generateToken);

router.post("/logout", logout);

export default router;
