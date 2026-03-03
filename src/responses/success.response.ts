import type {Response} from "express";

export const success = (res: Response, data = {}, statusCode = 200) => res.status(statusCode).json({
    success: true,
    data
});