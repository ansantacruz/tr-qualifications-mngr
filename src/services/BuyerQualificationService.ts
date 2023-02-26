import debugLib from 'debug';
import BuyerQualificationDataSource from '../datasource/BuyerQualificationDataSource';
import { IBuyerQualificationResponse } from '../model/Response/IBuyerQualificationResponse';
//Model
import { IBuyyerAddQualificationRequest } from '../model/Request/IBuyerAddQualificationRequest';
import { IBuyerAddQualificationResponse } from '../model/Response/IBuyerAddQualificationResponse';

const debug = debugLib('tc:BuyerQualificationService');


export class BuyerQualificationService {

   public static async getBuyerQualification(idBuyer: number): Promise<IBuyerQualificationResponse[]> {
      try {
         const response = await BuyerQualificationDataSource.getBuyerQualification(idBuyer);
         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to obtain the search configuration %s ', err);
         return Promise.reject(err);
      }
   }

   public static async addBuyerQualification(dataRequest: IBuyyerAddQualificationRequest):
   Promise<IBuyerAddQualificationResponse> {
      try {
         const response = await BuyerQualificationDataSource.addBuyerQualification(dataRequest);
         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to obtain the search configuration %s ', err);
         return Promise.reject(err);
      }

   }
}
