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
            logging.warn('No benefits were found');
            res.status(404).json({ message: 'No benefits were found' });
        }
    } catch (error: any) {
        logging.error(error.message);

        res.status(500).json({
            error: 'Error while fetching benefits',
            details: error.message
        });
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
            logging.warn(`No benefit with ID: ${id}`);
            res.status(404).json({ error: `No benefit with ID: ${id}` });
        }
    } catch (error: any) {
        logging.error(error.message);

        res.status(500).json({
            error: `Error while fetching benefit with ID: ${id}`,
            details: error.message
        });
    }
});

export default router;
