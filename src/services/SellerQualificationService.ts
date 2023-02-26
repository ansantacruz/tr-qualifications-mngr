import debugLib from 'debug';
import SellerQualificationDataSource from '../datasource/SellerQualificationDataSource';
import { ISellerAddQualificationRequest } from '../model/Request/ISellerAddQualificationRequest';
//model
import { IBuyerQualificationResponse } from '../model/Response/IBuyerQualificationResponse';
import { ISellerAddQualificationResponse } from '../model/Response/ISellerAddQualificationResponse';

const debug = debugLib('tc:SellerQualificationService');
export class SellerQualificationService {

    public static async getSellerQualification(idSeller : number): Promise<IBuyerQualificationResponse[]> {
     try {
        const response =  await SellerQualificationDataSource.getSellerQualification(idSeller);
        return Promise.resolve(response);
     } catch (err) {
        debug('Error trying to obtain the search configuration %s ', err);
        return Promise.reject(err);
     }
    }

    public static async addSellerQualification(dataRequest : ISellerAddQualificationRequest):
    Promise<ISellerAddQualificationResponse> {
      try {
         const response =  await SellerQualificationDataSource.addSellerQualification(dataRequest);
         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to obtain the search configuration %s ', err);
         return Promise.reject(err);
      }
     }
}
