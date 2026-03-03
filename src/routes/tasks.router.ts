import express from "express";

import {tasksController} from "@controllers/tasks.controller";

const router = express.Router();

// GET /tasks
// POST /tasks
router
    .route("/")
    .get(tasksController.browse)
    .post(tasksController.add);

// GET /tasks/:id
// PUT /tasks/:id
// DELETE /tasks/:id
router
    .route("/:id")
    .get(tasksController.read)
    .put(tasksController.edit)
    .delete(tasksController.destroy);

export default router;
