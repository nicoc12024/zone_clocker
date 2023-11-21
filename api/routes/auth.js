import express from "express";
import {
  registerAdminAndCompany,
  login,
  loginEmployee,
  logout,
  validateJWTAndSendUserInfo,
} from "../controllers/auth/auth.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/create-account", registerAdminAndCompany);
router.post("/login", login);
router.get("/validate-jwt-on-refresh-page", validateJWT, validateJWTAndSendUserInfo);
router.post("/logout", logout);
router.post("/login-employee", loginEmployee);

export default router;
