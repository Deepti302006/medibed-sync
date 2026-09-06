import express from "express";
import { getAllPatients, addPatient } from "../controllers/patientController";

const router = express.Router();

router.get("/", getAllPatients);
router.post("/", addPatient);

export default router;
