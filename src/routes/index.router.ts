import express from "express";

import health from "./health.router";
import tasks from "./tasks.router";

export const router = express.Router();

router.use("/health", health)

router.use("/tasks", tasks)

export default router