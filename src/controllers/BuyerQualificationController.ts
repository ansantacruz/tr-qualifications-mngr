import debugLib from 'debug';
import { Request, Response, Router } from 'express';
import RequestLogger from '../utilities/RequestLogger';
import HTTP_STATUS_CODES from 'http-status';
import { DebugUtilities } from '../utilities/DebugUtilities';
import { BuyerQualificationService } from '../services/BuyerQualificationService';

const debug = debugLib('tc:BuyerQualificationController');
const BuyerQualificationController = Router();


BuyerQualificationController.get(
    '/getBuyerQualification',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            console.log('hello',res)
            const response =  await BuyerQualificationService.getBuyerQualification();
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-CoeController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

export default BuyerQualificationController;