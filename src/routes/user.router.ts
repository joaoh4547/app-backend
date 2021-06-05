import { Router } from "express";
import UserController from "./../controllers/user.controller";
const router = Router();
router.get("/", UserController.findAll);
router.get("/:id", UserController.findById);
router.post("/", UserController.create);
export default router;
