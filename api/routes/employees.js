import express from "express";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  updateZoneForEmployees,
} from "../controllers/employee/employee.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/add-employee", validateJWT, addEmployee);
router.get("/get-employees", validateJWT, getEmployees);
router.put("/update-employee/:id", validateJWT, updateEmployee);
router.delete("/delete-employee/:id", validateJWT, deleteEmployee);
router.put("/update-zone", validateJWT, updateZoneForEmployees);

export default router;
