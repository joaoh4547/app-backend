import authController from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();
router.post("/", authController.auth);
export default router;
