import type {Request, Response} from "express";

import {success} from "@responses/success.response";
import {error} from "@responses/error.response";
import {prisma} from "@lib/prisma";

export const browse = async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany();
        success(res, tasks, 201)
    } catch (err) {
        console.error(err);
        error(res, 'Error while reading task');
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const {title, description, dueDate} = req.body;

        if (!title || !description)
            return error(res, 'Missing title or description', 400);

        const newTask = await prisma.task.create({
            data: {title, description, dueDate}
        });

        success(res, newTask, 201)
    } catch (e) {
        console.error(e);
        error(res, 'Error while adding task');
    }
}

export const read = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const task = await prisma.task.findUnique({
            where: {id: Number(id)}
        })

        if (!task) {
            return error(res, 'Task not found', 404);
        }

        success(res, task, 201)
    } catch (e) {
        console.error(e);
        error(res, 'Error while reading task');
    }
}

export const edit = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {title, description, completed, dueDate} = req.body;

        await prisma.task.update(
            {
                where: {id: Number(id)},
                data: {title, description, completed, dueDate}
            }
        );

        success(res, 'Task updated successfully', 201)
    } catch (e) {
        error(res, 'Error while updating task');
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        await prisma.task.delete({where: {id: Number(id)},})

        success(res, 'Task deleted successfully', 204)
    } catch (e) {
        console.error(e);
        error(res, 'Error while deleting task');
    }
}