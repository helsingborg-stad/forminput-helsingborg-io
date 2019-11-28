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
        .get('/api/v1/users/197606270349/forms')
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
        .get('/api/v1/users/197606270349/forms/3')
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
        .delete('/api/v1/users/195711260629/forms')
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
        .delete('/api/v1/users/197606270349/forms/3')
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
          userId: 197606270349,
          answer: 'Sverige',
          formId: 4,
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
          id: 2,
          userId: 197606270349,
          answer: 'Updated phrase',
          formId: 5,
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
