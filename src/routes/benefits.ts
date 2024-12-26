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
    const { page = 1 } = req.query;
    const cacheKey = `allBenefits_page_${page}`;

    (async () => {
        try {
            const cachedData = getFromCache(cacheKey);
            if (cachedData) {
                logging.info('Serving data from cache', cachedData);
                return res.status(200).json(cachedData);
            }

            const response = await axios.get(`${API_BASE_URL}?page=${page}`);
            if (response.data) {
                logging.info('Fetched benefits successfully', response.data);

                setInCache(cacheKey, response.data, 180);
                return res.status(200).json(response.data);
            }

            throw new Error('No benefits were found');
        } catch (error) {
            next(error); // Pass error to errorHandler
        }
    })();
});

router.get('/api/beneficios/:id', (req, res, next) => {
    const { id } = req.params;
    const cacheKey = `singleBenefitId:${id}`;

    (async () => {
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
            }

            throw new Error(`No benefit with ID: ${id}`);
        } catch (error) {
            next(error); // Pass error to errorHandler
        }
    })();
});

router.get('/api/beneficios/comercio/:value', (req, res, next) => {
    const { value } = req.params;
    const cacheKey = `benefitsByValue:${value}`;

    (async () => {
        try {
            const cachedData = getFromCache(cacheKey);
            if (cachedData) {
                logging.info('Serving data from cache', cachedData);
                return res.status(200).json(cachedData);
            }

            const response = await axios.get(`${API_BASE_URL}?archivado=false&comercio=${encodeURIComponent(value)}`);
            if (response.data) {
                logging.info(`Fetched benefits for "${value}" successfully`, response.data);

                setInCache(cacheKey, response.data, 180);

                return res.status(200).json(response.data);
            }

            throw new Error(`No benefits found for comercio: ${value}`);
        } catch (error) {
            next(error); // Pass error to errorHandler
        }
    })();
});

export default router;
