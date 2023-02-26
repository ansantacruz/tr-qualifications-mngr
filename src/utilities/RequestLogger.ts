import debugLib from 'debug';
import { NextFunction, Request, Response } from 'express';

const debug = debugLib('tc:RequestLogger');


export default class RequestLogger {
    public static basic = async (req: Request, _res: Response, next: NextFunction) => {
        let rqUid = '';
        debug('[%s] Params: %o', rqUid, req.params);
        debug('[%s] Query: %o', rqUid, req.query);
        debug('[%s] Headers: %o', rqUid, req.headers);
        debug('[%s] Body: %o', rqUid, req.body);
        next();
    };
}
