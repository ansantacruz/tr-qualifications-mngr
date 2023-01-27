import debugLib from 'debug';
import { Request, Response, Router } from 'express';
import RequestLogger from '../utilities/RequestLogger';
import HTTP_STATUS_CODES from 'http-status';
import { DebugUtilities } from '../utilities/DebugUtilities';
import { SellerQualificationService } from '../services/SellerQualificationService';


const debug = debugLib('tc:SellerQualificationController');
const SellerQualificationController = Router();

//get seller ratings
SellerQualificationController.get(
    '/Seller/getSellerQualification/:idSeller',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const idSeller  = +req.params.idSeller;
            console.log('idVendedor',idSeller)
            const response =  await SellerQualificationService.getSellerQualification(idSeller);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-CoeController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

//add seller rating
SellerQualificationController.post(
    '/Seller/addSellerQualification',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const response =  await SellerQualificationService.addSellerQualification(req.body);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-CoeController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

export default SellerQualificationController;