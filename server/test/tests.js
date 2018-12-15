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
  it('Test case for user signup: create new user and return `201`', done => {
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
  it('check if user already exist and return`409`', done => {
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
  it('should not create user and return`400`', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup/')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should not create user and return`400`', done => {
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
  it('should not create user and return`400`', done => {
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
  it('should not create user and return`400`', done => {
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
  it('check if user fullname is invalid and return`400`', done => {
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
  it('check if email is invalid return`400`', done => {
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
  it('check if sign up password is invalid return`400`', done => {
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
  it('should check if email is invalid return `400`', done => {
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
  it('should check if password is invalid return `400`', done => {
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
  it('should check invalid credential return `401`', done => {
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
  it('should sign in return `200`', done => {
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
  it('should check wrong token return `500`', done => {
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
  it('All test case for user entries: invalid input return`400`', done => {
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
  it('Invalid title input return`400`', done => {
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
  it('Invalid title input return`400`', done => {
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
  it('Invalid entry input return`400`', done => {
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
  it('Invalid entry input return`400`', done => {
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
  it('Invalid entry input return`401`', done => {
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
  it('Add entry input and return`201`', done => {
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
  it('(Update entry): invalid input return`400`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/765f4b9f-2564-4a6a-b252-4f60be63031b')
      .set('x-access-token', token)
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('(Update entry): Invalid title input return`400`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/765f4b9f-2564-4a6a-b252-4f60be63031b')
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
  it('(Update entry): Invalid title input return`400`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/765f4b9f-2564-4a6a-b252-4f60be63031b')
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
  it('(Update entry): Invalid entry input return`400`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/765f4b9f-2564-4a6a-b252-4f60be63031b')
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
  it('(Update entry): Invalid entry input return`400`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/765f4b9f-2564-4a6a-b252-4f60be63031b')
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
  it('(Update entry): Invalid entry input return`401`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/765f4b9f-2564-4a6a-b252-4f60be63031b')
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
  it('(Update entry): Update entry input and return`201`', done => {
    chai
      .request(app)
      .put('/api/v1/entries/765f4b9f-2564-4a6a-b252-4f60be63031b')
      .set('x-access-token', token)
      .send({
        title: 'My Dairy project',
        entry: 'Andela Bootcamp Camp Project'
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('get ALL Entries without token return 401', done => {
    chai
      .request(app)
      .get('/api/v1/entries')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('should get ALL Entries on api/v1/entries GET', done => {
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
});
