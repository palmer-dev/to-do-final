import { prisma } from "@lib/prisma";
import type {Request, Response} from "express";

export const healthCheck = async (req: Request, res: Response) => {
    try {
        await prisma.$queryRaw`SELECT 1`

        res.status(200).json({
            status: "UP",
            database: "CONNECTED",
            timestamp: new Date().toISOString()
        });
    } catch (error: unknown) {
        console.error(error);
        res.status(503).json({
            status: "DOWN",
            database: "DISCONNECTED",
            error: (error as unknown as { message: string }).message
        })
    }
}

export default {healthCheck};