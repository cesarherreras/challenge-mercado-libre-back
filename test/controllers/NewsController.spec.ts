import sinon from 'sinon';
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../src/app';
import { NewsService } from '../../src/services/news.service';
chai.use(chaiHttp);
chai.should();
describe('News Controller', () => {

    it('should 200', (done) => {
        sinon.stub(NewsService, 'getNews').returns(
            Promise.resolve([]));
        chai.request(app)
            .post('/news')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
})
