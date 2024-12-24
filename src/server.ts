import http from 'http';
import express from 'express';
import './config/logging';
import { SERVER, SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';

export const router = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.info('--------------------');
    logging.info('Initializing API');
    logging.info('--------------------');
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    logging.info('--------------------');
    logging.info('Logging & Configuration');
    logging.info('--------------------');
    router.use(loggingHandler);
    router.use(corsHandler);

    logging.info('--------------------');
    logging.info('Controller Routing');
    logging.info('--------------------');
    router.get('/main/healthcheck', (req, res) => {
        res.status(200).json({ status: 'RUNNING' });
    }) as express.RequestHandler;

    logging.info('--------------------');
    logging.info('Controller Routing');
    logging.info('--------------------');
    router.use(routeNotFound);

    logging.info('--------------------');
    logging.info('Start Server');
    logging.info('--------------------');
    httpServer = http.createServer(router);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info('--------------------');
        logging.info('Server Started: ' + SERVER_HOSTNAME + ':' + SERVER_PORT);
        logging.info('--------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
