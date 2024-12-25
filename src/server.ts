import http from 'http';
import express from 'express';
import './config/logging';
import { SERVER, SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { errorHandler } from './middleware/errorHandler';
import benefitRoutes from './routes/benefits';

export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.log('------------------------------');
    logging.log('Initializing API');
    logging.log('------------------------------');

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    logging.log('------------------------------');
    logging.log('Logging & Configuration');
    logging.log('------------------------------');
    app.use(loggingHandler);
    app.use(corsHandler);

    logging.log('------------------------------');
    logging.log('Benefits Routing');
    logging.log('------------------------------');
    app.use(benefitRoutes);

    logging.log('------------------------------');
    logging.log('Controller Routing');
    logging.log('------------------------------');
    app.get('/api/healthcheck', (req, res) => {
        res.status(200).json({ status: 'RUNNING' });
    });

    logging.log('------------------------------');
    logging.log('Error Middleware');
    logging.log('------------------------------');
    app.use((req, res, next) => {
        const error = new Error(`Route Not Found: ${req.method} ${req.originalUrl}`);
        (error as any).status = 404;
        next(error); // Pass error to errorHandler
    });
    app.use(errorHandler);

    logging.log('------------------------------');
    logging.log('Start Server');
    logging.log('------------------------------');
    httpServer = http.createServer(app);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.log('------------------------------');
        logging.info('Server Started: ' + SERVER_HOSTNAME + ':' + SERVER_PORT);
        logging.log('------------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
