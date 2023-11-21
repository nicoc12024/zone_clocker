import express from "express";
import { validateJWT } from "../middleware/validateJWT.js";
import { addAccount, getAccounts, updateAdmin } from "../controllers/account/account.js";

const router = express.Router();

router.post("/add-account", validateJWT, addAccount);
router.get("/get-accounts", validateJWT, getAccounts);
router.put("/update-admin/:id_admin", validateJWT, updateAdmin);

export default router;
