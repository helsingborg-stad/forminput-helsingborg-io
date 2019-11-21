/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

const should = chai.should();
chai.use(chaiHttp);

describe('api/v1/', () => {
  after(async () => {
    server.close();
  });


  describe('GET /users/:userId/forms', () => {
    it('should return all forms of a single user', async () => {
      chai
        .request(server)
        .get('/api/v1/users/2/forms')
        .send()
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          should.exist(res.body);
        });
    });
  });

  describe('GET /users/:userId/forms/:formId', () => {
    it('should return a single form of a single user', async () => {
      chai
        .request(server)
        .get('/api/v1/users/3/forms/1')
        .send()
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          should.exist(res.body);
        });
    });
  });

  describe('DELETE /users/:userId/forms', () => {
    it('should erase all forms of a single user', async () => {
      chai
        .request(server)
        .delete('/api/v1/users/2/forms')
        .send()
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          should.exist(res.body);
        });
    });
  });

  describe('DELETE /users/:userId/forms/:formId', () => {
    it('should erase all forms of a single user', async () => {
      chai
        .request(server)
        .delete('/api/v1/users/3/forms/1')
        .send()
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          should.exist(res.body);
        });
    });
  });

  describe('POST /answers', () => {
    it('Should save the answer in the database', async () => {
      chai
        .request(server)
        .post('/api/v1/answers')
        .send({
          userId: 4,
          answer: ['England', 'Sverige', 'USA'],
          formId: 2,
          questionType: 'multiple',
        })
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          should.exist(res.body);
        });
    });
  });

  describe('POST /answers', () => {
    it('Should save the answer in the database', async () => {
      chai
        .request(server)
        .post('/api/v1/answers')
        .send({
          userId: 4,
          answer: 'Sverige',
          formId: 3,
          questionType: 'single',
        })
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          should.exist(res.body);
        });
    });
  });

  describe('PUT /answers', () => {
    it('Should save the answer in the database', async () => {
      chai
        .request(server)
        .put('/api/v1/answers')
        .send({
          id: 45,
          userId: 4,
          answer: 'Test phrase',
          formId: 3,
          questionType: 'single',
        })
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          should.exist(res.body);
        });
    });
  });
});
