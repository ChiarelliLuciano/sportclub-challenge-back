import axios from 'axios';
import express from 'express';
import { API_BASE_URL } from '../config/config';

const router = express.Router();

router.get('/api/beneficios', async (req, res, next) => {
    try {
        const response = await axios.get(API_BASE_URL);

        if (response.data) {
            logging.info('Fetched benefits successfully', response.data);

            res.status(200).json(response.data);
        } else {
            const error = new Error('No benefits were found');
            throw error;
        }
    } catch (error: any) {
        logging.error(error.message);

        next(error); // Pass error to errorHandler
    }
});

router.get('/api/beneficios/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        if (response.data) {
            logging.info(`Fetched benefit with id ${id} successfully`, response.data);

            res.status(200).json(response.data);
        } else {
            const error = new Error(`No benefit with ID: ${id}`);
            throw error;
        }
    } catch (error: any) {
        logging.error(error.message);

        next(error); // Pass error to errorHandler
    }
});

export default router;
