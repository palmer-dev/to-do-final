import express from 'express';
import morgan from "morgan";
import cors from "cors";

export const app = express();

app.use(morgan("combined"));

// use some application-level middlewares
app.use(
    cors({
        origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.options("*any", cors());

app.use(express.json());

export default app;