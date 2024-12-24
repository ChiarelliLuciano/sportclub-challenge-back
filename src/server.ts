import http from 'http';
import express from 'express';
import './config/logging';
import { SERVER, SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import benefitRoutes from './routes/benefits';

export const router = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.log('------------------------------');
    logging.log('Initializing API');
    logging.log('------------------------------');
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    logging.log('------------------------------');
    logging.log('Logging & Configuration');
    logging.log('------------------------------');
    router.use(loggingHandler);
    router.use(corsHandler);

    logging.log('------------------------------');
    logging.log('Benefits Routing');
    logging.log('------------------------------');
    router.use(benefitRoutes);

    logging.log('------------------------------');
    logging.log('Controller Routing');
    logging.log('------------------------------');
    router.get('/api/healthcheck', (req, res) => {
        res.status(200).json({ status: 'RUNNING' });
    });
    router.use(routeNotFound);

    logging.log('------------------------------');
    logging.log('Start Server');
    logging.log('------------------------------');
    httpServer = http.createServer(router);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.log('------------------------------');
        logging.info('Server Started: ' + SERVER_HOSTNAME + ':' + SERVER_PORT);
        logging.log('------------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
