import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { DebugUtilities } from '../../src/utilities/DebugUtilities';
import sinon from 'sinon';


chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('DebugUtilities', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should return reason as error instance', () => {
        const message = DebugUtilities.getMessage(new Error('TEST ERROR INSTANCE'));
        expect('TEST ERROR INSTANCE').equal(message);
    });

    it('should return reason no error instance', () => {
        const message = DebugUtilities.getMessage('TEST ERROR');
        expect('TEST ERROR').equal(message);
    });

    it('should return defined error', () => {
        const error = DebugUtilities.error(
            { Reason: 'test error', Code: 'ERR-TEST', StatusCode: 400 }, 'Error', "uuid()");
        assert.isDefined(error);
        assert.isNumber(error.codeStatusError);
        expect(error.statusError.Status.StatusCode).equal(error.codeStatusError);
    });

    it('should return general error', () => {
        const error = DebugUtilities.error( {}, 'Error', "uuid()");
        assert.isDefined(error);
        assert.isNumber(error.codeStatusError);
        expect(error.statusError.Status.StatusCode).equal(error.codeStatusError);
    });

});
