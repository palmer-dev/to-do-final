import {prisma} from "@lib/prisma";

export const healthCheck = async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`

        res.status(200).json({
            status: "UP",
            database: "CONNECTED",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        res.status(503).json({
            status: "DOWN",
            database: "DISCONNECTED",
            error: error.message
        })
    }
}

export default {healthCheck};