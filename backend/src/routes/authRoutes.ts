import express from "express";
import { createAdmin, loginAdmin, verifyAdminToken } from "../controllers/authController";
import { requireAuth } from "./src/middleware/authMiddleware";

const router = express.Router();

router.post("/create-admin", createAdmin);
router.post("/login", loginAdmin);
router.get("/verify-admin", requireAuth, verifyAdminToken);

export default router;
