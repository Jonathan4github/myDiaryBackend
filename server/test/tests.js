import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../models/db';

db.createTables();
const should = chai.should();
chai.use(chaiHttp);
let token;
const wrongToken = 'hdhdnememeelelee';
describe('All test case for mydiary', () => {
  it('Test case for loading application home page', done => {
    chai
      .request(app)
      .get('/')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Welcome to "mydiary" An online journal');
        done();
      });
  });
  it('Test case for invalid route', done => {
    chai
      .request(app)
      .get('/diary')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.equal('Page not found');
        done();
      });
  });
  it('Valid credential SignUp user and return `201`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup/')
      .send({
        fullname: 'Jonathan Williams',
        email: 'joshua@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.equal('Success');
        res.body.message.should.equal('Sign up Sucessfully');
        done();
      });
  });
  it('SignUp: user already exist return`409`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup/')
      .send({
        fullname: 'Jonathan Williams',
        email: 'joshua@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.status.should.equal('Failed');
        res.body.message.should.equal('User with the given EMAIL already exist');
        done();
      });
  });
  it('SignUp: fullname, email & password undefined return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup/')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('SignUp: email & password undefined return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup/')
      .send({
        fullname: 'Jonathan Williams'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('SignUp: password undefined return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup/')
      .send({
        fullname: 'Jonathan Williams',
        email: 'joshua@gmail.com'
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('SignUp: empty fullname, email & password return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup/')
      .send({
        fullname: '',
        email: '',
        password: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('SignUp: Invalid fullname length return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup/')
      .send({
        fullname: 'jj',
        email: 'j@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.fullname.should.equal('Fullname must not be less than 5 characters or above 20');
        done();
      });
  });
  it('SignUp: Invalid email address return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup/')
      .send({
        fullname: 'jonathan',
        email: 'gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.email.should.equal('Please enter a valid email');
        done();
      });
  });
  it('SignUp: Invalid password length return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup/')
      .send({
        fullname: 'James Bowen',
        email: 'bowengmail.com',
        password: 'p'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.password.should.equal('password must not be less than 7 characters or above 10');
        done();
      });
  });
  it('SignIn: Invalid email address return `400`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.email.should.equal('Please enter a valid email');
        done();
      });
  });
  it('SignIn: invalid password length return `400`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'joshua@gmail.com',
        password: 'p'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.password.should.equal('Please enter a valid password');
        done();
      });
  });
  it('SignIn: invalid credential return `401`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'invalid@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.status.should.equal('Fail');
        res.body.message.should.equal('The credentials you provided is incorrect');
        done();
      });
  });
  it('Valid credential SignIn return `200`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'joshua@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.status.should.equal('Success');
        res.body.message.should.equal('Sucessful login');
        done();
      });
  });
  it('SignIn: invalid token return `500`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'joshua@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.status.should.equal('Success');
        res.body.message.should.equal('Sucessful login');
        done();
      });
  });
  it('Entries: title & entry undefined return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('x-access-token', token)
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Entries: invalid title length return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('x-access-token', token)
      .send({
        title: 'hi',
        entry: 'My diary bootcamp project'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.title.should.equal('Title Maximum character 30 and minmum 10');
        done();
      });
  });
  it('Entries: title undefined return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('x-access-token', token)
      .send({
        entry: 'My diary bootcamp project'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.title.should.equal('Title undefined. Title field is required');
        done();
      });
  });
  it('Entries: entry undefined return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('x-access-token', token)
      .send({
        title: 'My Dairy project'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.entry.should.equal('Entry undefined. Entry field is required');
        done();
      });
  });
  it('Entries: invalid entry length return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('x-access-token', token)
      .send({
        title: 'My Dairy project',
        entry: 'Bootcamp'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.entry.should.equal('Entry minimum character 10 and maximum  1000');
        done();
      });
  });
  it('Entries: invalid token return`401`', done => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('x-access-token', wrongToken)
      .send({
        title: 'My Dairy project',
        entry: 'Andela Bootcamp Camp Project'
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Entries: add entry for valid input and return`201`', done => {
    chai
      .request(app)
      .post('/api/v1/entries')
      .set('x-access-token', token)
      .send({
        title: 'My Dairy project',
        entry: 'Andela Bootcamp Camp Project'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.equal('Success');
        res.body.message.should.equal('entry created successfully');
        done();
      });
  });
  //Update entry
  it('Update Entry: title and entry undefined return`400`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/1')
      .set('x-access-token', token)
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Update Entry: invalid title length return`400`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/1')
      .set('x-access-token', token)
      .send({
        title: 'hi',
        entry: 'My diary bootcamp project'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.title.should.equal('Title Maximum character 30 and minmum 10');
        done();
      });
  });
  it('Update Entry: title undefined return`400`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/1')
      .set('x-access-token', token)
      .send({
        entry: 'My diary bootcamp project'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.title.should.equal('Title undefined. Title field is required');
        done();
      });
  });
  it('Update Entry: entry undefined return`400`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/1')
      .set('x-access-token', token)
      .send({
        title: 'My Dairy project'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.entry.should.equal('Entry undefined. Entry field is required');
        done();
      });
  });
  it('Update Entry: invalid entry length return`400`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/1')
      .set('x-access-token', token)
      .send({
        title: 'My Dairy project',
        entry: 'Bootcamp'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.entry.should.equal('Entry minimum character 10 and maximum  1000');
        done();
      });
  });
  it('Update entry: invalid token return`401`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/1')
      .set('x-access-token', wrongToken)
      .send({
        title: 'My Dairy project',
        entry: 'Andela Bootcamp Camp Project'
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Update Entry: valid input, update entry and return`200`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/1')
      .set('x-access-token', token)
      .send({
        title: 'My Dairy project',
        entry: 'Andela Bootcamp Camp Project'
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Entries: get ALL entries missing token return 401', done => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Entries: get ALL Entries with valid token return 200', done => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Entries: get ALL Entries. Invalid token return 200', done => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .set('x-access-token', wrongToken)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Entries: get single entry with valid token return 200', done => {
    chai
      .request(app)
      .get('/api/v1/entries/1')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Entries: get single entry with invalid token return 401', done => {
    chai
      .request(app)
      .get('/api/v1/entries/1')
      .set('x-access-token', wrongToken)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Entries: get single entry with missing token return 500', done => {
    chai
      .request(app)
      .get('/api/v1/entries/1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Entries: get single entry with invalid id return 404', done => {
    chai
      .request(app)
      .get('/api/v1/entries/3')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('Entries: delete entry with invalid id return 404', done => {
    chai
      .request(app)
      .delete('/api/v1/entries/3')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('Entries: delete entry return 200', done => {
    chai
      .request(app)
      .delete('/api/v1/entries/1')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
