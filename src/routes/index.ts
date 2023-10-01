import { authRoutes } from "./auth.routes";
import { taskRoutes } from "./task.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);
router.use("/task", taskRoutes);

export { router as allRoutes };
