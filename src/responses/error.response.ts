import type {Response} from "express";

export const error = (res: Response, data = "Une erreur est survenue", statusCode = 500) => res.status(statusCode).json({
    success: false,
    error: data
});