import type {Response} from "express";

export const error = (res: Response, data = {}, statusCode = 500) => res.status(statusCode).json({
    success: false,
    data
});