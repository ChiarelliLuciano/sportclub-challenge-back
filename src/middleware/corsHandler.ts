import { Request, Response, NextFunction } from 'express';

export function corsHandler(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    // This allows anyone to call the API, but here we could restrict IPs, hostnames, etc

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        // This defines the allowed methods inside of our API. For the purposes of this challenge, only GET method is required, but we could also add PUT, POST, PATCH or DELETE if necessary
        res.status(200).end();
    } else {
        next();
    }
}
