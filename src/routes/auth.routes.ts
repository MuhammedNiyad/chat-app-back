// src/routes/auth.routes.ts
import express from "express";
import * as AuthController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/login", AuthController.login);

export default router;
