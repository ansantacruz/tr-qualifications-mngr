import debugLib from 'debug';
import BuyerQualificationDataSource from '../datasource/BuyerQualificationDataSource';
import { IBuyerQualification } from '../model/IBuyerQualification';

const debug = debugLib('tc:BuyerQualificationService');


export class BuyerQualificationService {

    public static async getBuyerQualification(): Promise<IBuyerQualification> {
     try {
        const response =  await BuyerQualificationDataSource.getBuyerQualification();
        return Promise.resolve(response);
     } catch (err) {
        debug('Error trying to obtain the search configuration %s ', err);
        return Promise.reject(err);
     }
    }
}