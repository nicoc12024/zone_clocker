import express from "express";
import { login, logout, validateJWTAndSendUserInfo } from "../controllers/auth/auth.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/login", login);
router.get("/validate-jwt-on-refresh-page", validateJWT, validateJWTAndSendUserInfo);
// router.post("/logout", logout);

export default router;
