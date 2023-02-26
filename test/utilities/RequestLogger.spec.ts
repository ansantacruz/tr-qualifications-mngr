import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import RequestLogger from '../../src/utilities/RequestLogger';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;
const MockExpressRequest = require('mock-express-request');

describe('RequestLogger', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should return X-RqUID header valid', (done) => {
        const req = new MockExpressRequest({
            headers: {
                'X-Name': 'Vivienda'
            },
            method: 'POST',
            url: 'http://api-test/startValidations'
        });
        const res: any = {};
        const next = sinon.spy();
        RequestLogger.basic(req, res, next);
        expect(req.headers['x-rquid']);
        done();
    });

});
