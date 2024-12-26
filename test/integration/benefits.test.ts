import request from 'supertest';
import { app, Shutdown } from '../../src/server';
import NodeCache from 'node-cache';

jest.mock('axios');
jest.mock('node-cache', () => {
    let cache: Record<string, any> = {};

    return jest.fn().mockImplementation(() => ({
        get: jest.fn((key) => cache[key] || null),
        set: jest.fn((key, value) => {
            cache[key] = value;
        }),
        flushAll: jest.fn(() => {
            cache = {};
        })
    }));
});

const mockedAxios = jest.requireMock('axios');
const memoryCache = new NodeCache();

describe('Benefits Routes', () => {
    afterAll((done) => {
        Shutdown(done);
    });

    beforeEach(() => {
        memoryCache.flushAll();
        mockedAxios.get.mockReset();
    });

    describe('GET /api/beneficios', () => {
        it('Handles empty response from external API', async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: [] });

            const response = await request(app).get('/api/beneficios');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('Returns benefits from cache if available', async () => {
            const mockData = { error: false, status: 200, body: { beneficios: [{ id: 1, name: 'Benefit 1' }] } };
            memoryCache.set('allBenefits_page_1', mockData, 180);

            const response = await request(app).get('/api/beneficios');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });

        it('Fetches benefits from external API if not in cache', async () => {
            const mockData = [{ id: 1, name: 'Benefit 1' }];
            mockedAxios.get.mockResolvedValueOnce({ data: mockData });

            const response = await request(app).get('/api/beneficios');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });

        it('Handles errors when fetching all benefits', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch benefits'));

            const response = await request(app).get('/api/beneficios');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Failed to fetch benefits');
        });

        it('Handles 503 error when fetching benefits', async () => {
            mockedAxios.get.mockRejectedValueOnce({
                response: { status: 503 },
                message: 'Service Unavailable'
            });

            const response = await request(app).get('/api/beneficios');

            expect(response.status).toBe(503);
            expect(response.body.error).toBe('The API is unavailable. Please try again later.');
        });
    });

    describe('GET /api/beneficios/:id', () => {
        it('Returns a single benefit from cache if available', async () => {
            const mockData = { id: 1, name: 'Benefit 1' };
            memoryCache.set('singleBenefitId:1', mockData, 180);

            const response = await request(app).get('/api/beneficios/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });

        it('Fetches a single benefit from external API if not in cache', async () => {
            const mockData = { id: 1, name: 'Benefit 1' };
            mockedAxios.get.mockResolvedValueOnce({ data: mockData });

            const response = await request(app).get('/api/beneficios/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });

        it('Handles errors when fetching a single benefit', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Benefit Not Found'));

            const response = await request(app).get('/api/beneficios/9999');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Benefit Not Found');
        });
    });
});
