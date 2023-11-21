import express from "express";
import {
  addShift,
  getShifts,
  updateShift,
  deleteShift,
} from "../controllers/shift/shift.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/add-shift", validateJWT, addShift);
router.get("/get-shifts", validateJWT, getShifts);
router.put("/update-shift/:id_shift", validateJWT, updateShift);
router.delete("/delete-shift/:id_shift", validateJWT, deleteShift);

export default router;
