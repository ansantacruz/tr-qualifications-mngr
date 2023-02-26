import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import config from '../../src/config';
import BuyerQualificationController from '../../src/controllers/BuyerQualificationController';
import { IError } from '../../src/model/IError';
import { BuyerQualificationService } from '../../src/services/BuyerQualificationService';



chai.use(chaiHttp);
chai.should();
const apiPath = config.apiPath;
const expect = chai.expect;

const RESOLVE_RESPONSE_BUYER_QUEALIFICATIONS_GET = {
    "idVendedor": 1,
    "nombreVendedor": "string",
    "idComprador": 2,
    "nombreComprador": "string",
    "comentario": "string",
    "calificacion": "string",
    "porcentajeCalificacion": 2,
    "fechaComentario": new Date()
};

const RESOLVE_RESPONSE_BUYER_QUEALIFICATIONS_POST = {
    "idVendedor": 1,
    "comentario": "string",
    "idTipoComentario": 1,
    "idComprador": 1,
};

const REJECT_RESPONSE = {
    "EndDt": "01/01/2023",
    "Status": {
        'CodeError': '-000-0',
        'ServerStatusCode':'404',
        'Severity': 'Error',
        'StatusCode': 404,
        'StatusDesc': 'NOT_FOUND'
    }
} as IError;

describe('BuyerQualificationController', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should resolve getBuyerQualification', (done) => {
      sinon.replace(
        BuyerQualificationService,
          'getBuyerQualification',
        (): Promise<any> => {
          return Promise.resolve(RESOLVE_RESPONSE_BUYER_QUEALIFICATIONS_GET);
        }
      );
      chai
        .request(app)
        .get(apiPath + '/V1/Buyer/getBuyerQualification/1')
        .end((err, response) => {
          expect(response.status).to.equals(200);
          done();
        });
    });

    it('should reject getBuyerQualification', (done) => {
      sinon.replace(
        BuyerQualificationService,
          'getBuyerQualification',
        (): Promise<any> => {
          return Promise.reject({status:500});
        }
      );
      chai
        .request(app)
        .get(apiPath + '/V1/Buyer/getBuyerQualification/1')
        .end((err, response) => {
          expect(response.status).to.equals(500);
          done();
        });
    });


    //*** ****/

    it('should resolve addBuyerQualification', (done) => {
        sinon.replace(
          BuyerQualificationService,
            'addBuyerQualification',
          (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE_BUYER_QUEALIFICATIONS_POST);
          }
        );
        chai
          .request(app)
          .post(apiPath + '/V1/Buyer/addBuyerQualification')
          .end((err, response) => {
            expect(response.status).to.equals(200);
            done();
          });
      });
  
      it('should reject addBuyerQualification', (done) => {
        sinon.replace(
          BuyerQualificationService,
            'addBuyerQualification',
          (): Promise<any> => {
            return Promise.reject({status:500});
          }
        );
        chai
          .request(app)
          .post(apiPath + '/V1/Buyer/addBuyerQualification')
          .end((err, response) => {
            expect(response.status).to.equals(500);
            done();
          });
      });

    

});
