import debugLib from 'debug';
import SellerQualificationDataSource from '../datasource/SellerQualificationDataSource';
import { ISellerQualification } from '../model/ISellerQualification';

const debug = debugLib('tc:SellerQualificationService');


export class SellerQualificationService {

    public static async getSellerQualification(): Promise<ISellerQualification> {
     try {
        const response =  await SellerQualificationDataSource.getSellerQualification();
        return Promise.resolve(response);
     } catch (err) {
        debug('Error trying to obtain the search configuration %s ', err);
        return Promise.reject(err);
     }
    }
}