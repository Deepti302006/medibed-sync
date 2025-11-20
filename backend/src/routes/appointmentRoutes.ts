import { Router } from "express";
import * as ctrl from "../controllers/appointmentController";
import { requireAnyRole } from "../middleware/roleMiddleware";

const router = Router();

router.post("/", requireAnyRole(["admin", "staff", "doctor"]), ctrl.createAppointment);
router.get("/", requireAnyRole(["admin", "staff", "doctor"]), ctrl.getAppointments);
router.get("/:id", ctrl.getAppointment);
router.put("/:id", requireAnyRole(["admin", "staff", "doctor"]), ctrl.updateAppointment);
router.delete("/:id", requireAnyRole(["admin", "staff"]), ctrl.deleteAppointment);

export default router;