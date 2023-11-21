import express from "express";
import {
  addZone,
  getZones,
  updateZone,
  deleteZone,
  getZoneById,
} from "../controllers/zone/zone.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/add-zone", validateJWT, addZone);
router.get("/get-zones", validateJWT, getZones);
router.get("/get-zone/:id", validateJWT, getZoneById);
router.put("/update-zone", validateJWT, updateZone);
router.delete("/delete-zone/:id", validateJWT, deleteZone);

export default router;
