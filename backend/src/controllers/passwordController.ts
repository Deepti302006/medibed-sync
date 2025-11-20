import { Request, Response } from "express";
import User from "../models/userModel";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshTokenModel";
import { signAccessToken, signRefreshToken } from "../utils/token";
import nodemailer from "nodemailer";

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "No user with that email" });

  const token = crypto.randomBytes(32).toString("hex");
  const resetToken = jwt.sign({ id: user._id, token }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

  // In production, store hashed token in DB and send raw token by email. For simplicity we send link with jwt.
  const resetLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    to: user.email,
    from: process.env.SMTP_FROM || "no-reply@example.com",
    subject: "Password reset",
    text: `Click link to reset password: ${resetLink}`,
  });

  return res.json({ message: "Password reset email sent" });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const user = await User.findById(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.password = password; // model pre-save will hash
    await user.save();
    return res.json({ message: "Password changed" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const changePassword = async (req: Request & { user?: any }, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");
  if (!user) return res.status(404).json({ message: "User not found" });
  const ok = await user.comparePassword(oldPassword);
  if (!ok) return res.status(400).json({ message: "Old password incorrect" });
  user.password = newPassword;
  await user.save();
  return res.json({ message: "Password changed" });
};

// Optional: refresh token endpoint
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: "Refresh token missing" });
  try {
    const payload: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "refresh_secret");
    const stored = await RefreshToken.findOne({ user: payload.id, token: refreshToken });
    if (!stored) return res.status(401).json({ message: "Invalid refresh token" });

    const user = await User.findById(payload.id);
    const access = signAccessToken({ id: user._id, role: user.role });
    return res.json({ accessToken: access });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};