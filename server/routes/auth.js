import express from "express";
import { comlogin,emplogin, empregister,comregister, updateCompany } from "../controllers/auth.js";

const router = express.Router();

router.post("/regcom", comregister)
router.post("/logcom", comlogin)

// update company
router.put("/update",updateCompany)

router.post("/regemp", empregister)
router.post("/logemp", emplogin)


export default router
