import request from 'supertest';
import { app, Shutdown } from '../../src/server';

describe('App', () => {
    afterAll((done) => {
        Shutdown(done);
    });

    it('Starts and has the correct test environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(app).toBeDefined();
    }, 10000);

    it('Returns all methods allowed to be called', async () => {
        const response = request(app).options('/');

        expect((await response).status).toBe(200);
        expect((await response).headers['access-control-allow-methods']).toBe('GET');
    });

    it('Responds to health check endpoint', async () => {
        const response = await request(app).get('/api/healthcheck');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'RUNNING' });
    });
});
