import express from "express";

import {browse, add, read, edit, destroy} from "@controllers/tasks.controller";

const router = express.Router();

// GET /tasks
// POST /tasks
router
    .route("/")
    .get(browse)
    .post(add);

// GET /tasks/:id
// PUT /tasks/:id
// DELETE /tasks/:id
router
    .route("/:id")
    .get(read)
    .put(edit)
    .delete(destroy);

export default router;
