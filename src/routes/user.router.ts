import { Router } from "express";
import UserController from "./../controllers/user.controller";
const router = Router();
router.get("/", UserController.findAll);
router.post("/", UserController.create);
router.get("/:id", UserController.findById);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);
export default router;
