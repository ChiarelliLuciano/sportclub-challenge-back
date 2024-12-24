import { Request, Response, NextFunction } from 'express';

export function routeNotFound(req: Request, res: Response, next: NextFunction): void {
    const error = new Error('Route Not Found');

    logging.error(`Route Not Found - METHOD: [${req.method}] - URL: [${req.originalUrl}]`);

    res.status(404).json({
        error: 'Route Not Found',
        method: req.method,
        url: req.originalUrl
    });
}
