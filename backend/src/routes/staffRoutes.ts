import express from "express";
import { getAllStaff, addStaff } from "../controllers/staffController.js";

const router = express.Router();

router.get("/", getAllStaff);
router.post("/", addStaff);

export default router;
