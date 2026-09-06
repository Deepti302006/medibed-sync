import express from "express";
import { getAllStaff, addStaff } from "../controllers/staffController";

const router = express.Router();

router.get("/", getAllStaff);
router.post("/", addStaff);

export default router;
