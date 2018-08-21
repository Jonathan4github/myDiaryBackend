import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);

describe('Entries', () => {
  it('should load home page on / GET', (done) => {
    chai.request(app).get('/')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Welcome to "mydiary" An online journal');
        done();
      });
  });
  it('should have status 404 for un-program route / GET', (done) => {
    chai.request(app).get('/diary')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.equal('Page not found');
        done();
      });
  });
  it('should get ALL Entries on api/v1/entries GET', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should get a specific Entry on api/v1/entries/2 GET', (done) => {
    chai.request(app)
      .get('/api/v1/entries/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should fail for wrong specify  Entry id on api/v1/entries/5 GET', (done) => {
    chai.request(app)
      .get('/api/v1/entries/10')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');
        done();
      });
  });
});
