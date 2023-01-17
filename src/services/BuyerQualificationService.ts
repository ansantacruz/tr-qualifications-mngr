import debugLib from 'debug';
import BuyerQualificationDataSource from '../datasource/BuyerQualificationDataSource';
import { IBuyerQualificationResponse } from '../model/Response/IBuyerQualificationResponse';

const debug = debugLib('tc:BuyerQualificationService');


export class BuyerQualificationService {

    public static async getBuyerQualification(): Promise<IBuyerQualificationResponse> {
     try {
        const response =  await BuyerQualificationDataSource.getBuyerQualification();
        return Promise.resolve(response);
     } catch (err) {
        debug('Error trying to obtain the search configuration %s ', err);
        return Promise.reject(err);
     }
    }
}