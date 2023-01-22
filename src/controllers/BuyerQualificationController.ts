import debugLib from 'debug';
import { Request, Response, Router } from 'express';
import RequestLogger from '../utilities/RequestLogger';
import HTTP_STATUS_CODES from 'http-status';
import { DebugUtilities } from '../utilities/DebugUtilities';
import { BuyerQualificationService } from '../services/BuyerQualificationService';

const debug = debugLib('tc:BuyerQualificationController');
const BuyerQualificationController = Router();


BuyerQualificationController.get(
    '/Buyer/getBuyerQualification/:idBuyer',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const idBuyer  = +req.params.idBuyer;
            console.log('idComprador',idBuyer)
            const response =  await BuyerQualificationService.getBuyerQualification(idBuyer);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-CoeController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

//add seller rating
BuyerQualificationController.post('/Buyer/addBuyerQualification',function(req,res){
    console.log('Agregar comprador')
});

export default BuyerQualificationController;