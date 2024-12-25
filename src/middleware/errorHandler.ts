import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    // Handle timeout & unavailable API
    if (axios.isAxiosError(err) || (err.response && err.response.status)) {
        const status = err.response?.status || 500;
        const message =
            err.code === 'ECONNABORTED'
                ? 'The request timed out. Please try again later.'
                : status === 503 || status === 404
                ? 'The API is unavailable. Please try again later.'
                : err.message;

        logging.error(`Error - STATUS: [${status}] - MESSAGE: [${err.message}] - METHOD: [${req.method}] - URL: [${req.originalUrl}]`);

        res.status(status).json({ error: message });
        return;
    }

    // Handle generic errors
    const status = err.status || 500;
    logging.error(`Error - STATUS: [${status}] - MESSAGE: [${err.message}] - METHOD: [${req.method}] - URL: [${req.originalUrl}]`);

    res.status(status).json({
        error: err.message || 'Internal Server Error',
        method: req.method,
        url: req.originalUrl
    });
}
