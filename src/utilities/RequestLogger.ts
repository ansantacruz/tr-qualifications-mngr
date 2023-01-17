import debugLib from 'debug';
import { NextFunction, Request, Response } from 'express';

const debug = debugLib('tc:RequestLogger');
import { v4 as uuid } from 'uuid';

export default class RequestLogger {
    public static basic = async (req: Request, _res: Response, next: NextFunction) => {
        let rqUid = req.headers['x-rquid'];
        if (!rqUid) {
            rqUid = uuid();
            req.headers['x-rquid'] = rqUid;
        }
        debug('[%s] Params: %o', rqUid, req.params);
        debug('[%s] Query: %o', rqUid, req.query);
        debug('[%s] Headers: %o', rqUid, req.headers);
        debug('[%s] Body: %o', rqUid, req.body);
        next();
    };
}
