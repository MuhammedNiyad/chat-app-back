// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username } = req.body;
    const result = await AuthService.sendOtp(email, username);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp, username, profilePic } = req.body;
    const user = await AuthService.verifyOtpAndCreateUser(email, otp, username, profilePic);
    res.json({ user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await AuthService.loginUser(email);
    res.json({ user });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
