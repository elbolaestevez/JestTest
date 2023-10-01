import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router();

router.post("/create", TaskController.create);

router.get("/", TaskController.findAll);

router.get("/:id", TaskController.findById);

router.put("/:id", TaskController.update);

router.delete("/:id", TaskController.delete);

router.get("/status/:status", TaskController.findByStatus);

router.get("/:id/days-elapsed", TaskController.getDaysElapsed);

export { router as taskRoutes };
