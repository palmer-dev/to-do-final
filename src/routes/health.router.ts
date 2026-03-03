import express from 'express';
import healthController from '@controllers/health.controller';

export const router = express.Router();

router
    .route('/')
    .get(healthController.healthCheck);

export default router;