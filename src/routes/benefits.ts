import axios from 'axios';
import express from 'express';
import { API_BASE_URL } from '../config/config';
import NodeCache from 'node-cache';

const router = express.Router();
const memoryCache = new NodeCache();

function getFromCache(key: string): any {
    return memoryCache.get(key);
}
function setInCache(key: string, value: any, ttl: number): void {
    memoryCache.set(key, value, ttl); // Time to Live in seconds
}

router.get('/api/beneficios', (req, res, next) => {
    (async () => {
        const cacheKey = 'allBenefits';

        try {
            const cachedData = getFromCache(cacheKey);
            if (cachedData) {
                logging.info('Serving data from cache', cachedData);
                return res.status(200).json(cachedData);
            }

            const response = await axios.get(API_BASE_URL);
            if (response.data) {
                logging.info('Fetched benefits successfully', response.data);

                setInCache(cacheKey, response.data, 180);

                return res.status(200).json(response.data);
            } else {
                throw new Error('No benefits were found');
            }
        } catch (error: any) {
            next(error); // Pass error to errorHandler
        }
    })();
});

router.get('/api/beneficios/:id', (req, res, next) => {
    (async () => {
        const { id } = req.params;
        const cacheKey = `singleBenefitId:${id}`;

        try {
            const cachedData = getFromCache(cacheKey);
            if (cachedData) {
                logging.info('Serving data from cache', cachedData);
                return res.status(200).json(cachedData);
            }

            const response = await axios.get(`${API_BASE_URL}/${id}`);
            if (response.data) {
                logging.info(`Fetched benefit with ID ${id} successfully`, response.data);

                setInCache(cacheKey, response.data, 180);

                return res.status(200).json(response.data);
            } else {
                throw new Error(`No benefit with ID: ${id}`);
            }
        } catch (error: any) {
            next(error); // Pass error to errorHandler
        }
    })();
});

export default router;
