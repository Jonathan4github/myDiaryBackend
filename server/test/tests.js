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
  it('should not post with out title field on api/v1/entries POST', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        date: '2018-07-22',
        entry: 'Most challenging learning experience'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not post with out date field on api/v1/entries POST', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        title: 'Bootcamp',
        entry: 'Most challenging learning experience'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not post with empty date field on api/v1/entries POST', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        date: '',
        title: 'Bootcamp',
        entry: 'Most challenging learning experience'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not post with out entry field on api/v1/entries POST', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        date: '2018-07-22',
        title: 'Bootcamp'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should post with complete entry fields on api/v1/entries POST', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        title: 'Bootcamp cycle 34',
        date: '2018-07-22',
        entry: 'My most challenging learning experience...My most challenging learning experience...'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('success');
        done();
      });
  });
  it('should not post if entry length is less 25 characters long on api/v1/entries POST', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        title: 'Bootcamp cycle 34',
        date: '2018-07-22',
        entry: 'Bootcamp'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not post if entry title is less 15 characters long on api/v1/entries POST', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        title: 'Boot',
        date: '2018-07-22',
        entry: 'My most challenging learning experience. Bootcamp cycle 34'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  // Update entry
  it('should fail for wrong specify  Entry id on api/v1/entries/5 PUT', (done) => {
    chai.request(app)
      .put('/api/v1/entries/5')
      .send({
        title: 'Bootcamp cycle 34',
        date: '2018-07-22',
        entry: 'My most challenging learning experience...My most challenging learning experience...'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');
        done();
      });
  });
  it('should not update with out title field on api/v1/entries/id PUT', (done) => {
    chai.request(app)
      .put('/api/v1/entries/2')
      .send({
        date: '2018-07-22',
        entry: 'Most challenging learning experience'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not update with out date field on api/v1/entries/id PUT', (done) => {
    chai.request(app)
      .put('/api/v1/entries/2')
      .send({
        title: 'Bootcamp',
        entry: 'Most challenging learning experience'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not update with empty date field on api/v1/entries/id PUT', (done) => {
    chai.request(app)
      .put('/api/v1/entries/2')
      .send({
        date: '',
        title: 'Bootcamp',
        entry: 'Most challenging learning experience'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not update with out an entry field on api/v1/entries/id PUT', (done) => {
    chai.request(app)
      .put('/api/v1/entries/2')
      .send({
        date: '2018-07-22',
        title: 'Bootcamp'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should update with complete entry fields and valid id', (done) => {
    chai.request(app)
      .put('/api/v1/entries/2')
      .send({
        title: 'Bootcamp cycle 34',
        date: '2018-07-22',
        entry: 'My most challenging learning experience...My most challenging learning experience...'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('success');
        done();
      });
  });
});
