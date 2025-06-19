// src/services/auth.service.ts
import prisma from "../lib/prisma";
import jwt, { SignOptions } from "jsonwebtoken";

const otpStore = new Map<string, string>();

export const sendOtp = async (email: string, username: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already registered");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  console.log(`OTP for ${email}: ${otp}`);
  return { message: "OTP sent." };
};

export const verifyOtpAndCreateUser = async (email: string, otp: string, username: string, profilePic?: string) => {
  const stored = otpStore.get(email);
  if (stored !== otp) throw new Error("Invalid OTP");

  const user = await prisma.user.create({
    data: { email, username, profilePic },
  });

  otpStore.delete(email);

  const token = generateToken(user.id);
  return { user, token };
};

export const loginUser = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");
  const token = generateToken(user.id);
  return { user, token };
};

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET!;
  const expiresIn:any = process.env.JWT_EXPIRES_IN || "7d";

  const options: SignOptions = {
    expiresIn, // this now correctly typed
  };

  return jwt.sign({ userId }, secret, options);
};