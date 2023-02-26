import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('database', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should establish connection with database', (done) => {
        done();
    });

});
