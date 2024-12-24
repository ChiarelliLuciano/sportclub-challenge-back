import { Request, Response, NextFunction } from 'express';

export function routeNotFound(req: Request, res: Response, next: NextFunction): void {
    const error = new Error('Route Not Found');

    logging.error(error.message);

    res.status(404).json({ error: error.message });
}
