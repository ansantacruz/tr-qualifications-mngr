import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import * as database from '../../src/database/database';
import BuyerQualificationDataSource from '../../src/datasource/BuyerQualificationDataSource';
import { IBuyerQualificationResponse } from '../../src/model/Response/IBuyerQualificationResponse';

chai.use(chaiHttp);
chai.should();



const RESOLVE_RESPONSE_BUYER_QUEALIFICATIONS_GET =  [{
    "idVendedor": 1,
    "nombreVendedor": "string",
    "idComprador": 2,
    "nombreComprador": "string",
    "comentario": "string",
    "calificacion": "string",
    "porcentajeCalificacion": 2,
    "fechaComentario": new Date()
}] as IBuyerQualificationResponse [];


const REQUEST_ADD_BUYER_QUALIFOCATION = {
    "idVendedor": 1,
    "comentario": 'string',
    "idTipoComentario": 1,
    "idComprador": 1
}

const RESPONSE_ADD_BUYER_QUALIFOCATION = {
    "operationStatus": false,
    "operationCode": "string",
    "operationMessage":"strin"
}


describe('BuyerQualificationDataSource', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('getBuyerQualification 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE_BUYER_QUEALIFICATIONS_GET);
        });
        BuyerQualificationDataSource.getBuyerQualification(1)
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].idVendedor).equal(1);
                done();
            });
    });

    it('getBuyerQualification 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        BuyerQualificationDataSource.getBuyerQualification(1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.CodeError).equal('select_calificacion_comprador-404-DB');
                done();
            });
    });

    it('getBuyerQualification 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        BuyerQualificationDataSource.getBuyerQualification(1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('select_calificacion_comprador');
                done();
            });
    });

    /***   */

    it('addBuyerQualification 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE_BUYER_QUEALIFICATIONS_GET);
        });
        BuyerQualificationDataSource.addBuyerQualification(REQUEST_ADD_BUYER_QUALIFOCATION)
            .then((res) => {
                assert.isDefined(res);
                expect(res.operationStatus).equal(true);
                done();
            });
    });

    it('getBuyerQualification 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        BuyerQualificationDataSource.addBuyerQualification(REQUEST_ADD_BUYER_QUALIFOCATION)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('add-calificacion_comprador');
                done();
            });
    });
});
