import request from 'supertest';
import app from '../src/lib/app';
import {prisma} from "@lib/prisma";

describe('Tasks API endpoints', () => {
    afterAll(async () => {
        await prisma.task.deleteMany();
        await prisma.$disconnect();
    })

    let taskId: number;

    it('should create a task', async () => {
        const taskDate = new Date();
        taskDate.setDate(taskDate.getDate() + 1);

        const res = await request(app)
            .post('/tasks')
            .send({
                title: "Learn Docker",
                description: "Follow the assignments",
                dueDate: taskDate.toISOString()
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBeTruthy();
        expect(res.body.data.id).toBeDefined();
        expect(res.body.data.title).toBe("Learn Docker");
        expect(res.body.data.description).toBe("Follow the assignments");
        expect(res.body.data.dueDate).toBe(taskDate.toISOString());

        taskId = res.body.data.id;
    });

    it('should return all tasks', async () => {
        const res = await request(app).get('/tasks');

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
        expect(Array.isArray(res.body.data)).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return a specific task', async () => {
        const res = await request(app).get(`/tasks/${taskId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.data.id).toBe(taskId);
        expect(res.body.data.title).toBe("Learn Docker");
        expect(res.body.data.description).toBe("Follow the assignments");
        expect(res.body.data.completed).toBe(false);
    });

    it('should update a specific task', async () => {
        const res = await request(app)
            .put(`/tasks/${taskId}`)
            .send({
                title: "Updated task",
                completed: true
            });

        expect(res.statusCode).toEqual(204);

        const resUpt = await request(app).get(`/tasks/${taskId}`);
        expect(resUpt.statusCode).toEqual(200);
        expect(resUpt.body.success).toBeTruthy();
        expect(resUpt.body.data.id).toBe(taskId);
        expect(resUpt.body.data.title).toBe("Updated task");
        expect(resUpt.body.data.completed).toBe(true);
    })

    it('should delete a specific task', async () => {
        const res = await request(app).delete(`/tasks/${taskId}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should return 400 if title is missing', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                description: "Task description"
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toBe('Missing title or description');
    });

    it('should return 404 if task is not found', async () => {
        const res = await request(app).get('/tasks/999');
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toBe('Task not found');
    })
})