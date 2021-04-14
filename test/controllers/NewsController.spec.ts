import sinon from 'sinon';
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../src/app';
import { NewsService } from '../../src/services/news.service';
import { MysqlService } from '../../src/services/mysql.service';
chai.use(chaiHttp);
chai.should();
describe('News Controller', () => {

    afterEach(() => {
        sinon.restore();
    });
    it('should 200', (done) => {
        sinon.stub(NewsService, 'getNews').returns(
            Promise.resolve([]));
        chai.request(app)
            .get('/news')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return cache', (done) => {
        sinon.stub(MysqlService, 'getCache').returns(
            Promise.resolve({news: [], saveTime: new Date()}));
        chai.request(app)
            .get('/news')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should call service', (done) => {
        sinon.stub(MysqlService, 'getCache').returns(
            Promise.resolve(undefined));
        chai.request(app)
            .get('/news')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return get cache', (done) => {
        chai.request(app)
            .get('/news')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})
