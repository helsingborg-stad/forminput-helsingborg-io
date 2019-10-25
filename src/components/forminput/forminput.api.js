const express = require('express');
const dal = require('./forminput.dal');
const { post } = require('./forminput.schema');
const Validator = require('../../middlewares/validator.middleware');
const pjson = require('../../../package.json');

const routes = () => {
  const router = express.Router();

  // Here we register what endpoints we want.
  router.get('/', async (req, res) => res.json({
    jsonapi: {
      version: '1.0',
      meta: {
        apiVersion: '1',
        build: pjson.version,
        service: pjson.name,
        owner: 'Helsingborg Stad',
        description: pjson.description,
      },
    },
  }));


  // Here we register what endpoints we want.

  // Read endpoint
  router.get('/users/:userId/forms', async (req, res) => {
    const response = await dal.read.userForms(req, res);
    return response;
  });

  router.get('/users/:userId/forms/:formId', async (req, res) => {
    const answer = await dal.read.userForm(req, res);
    return answer;
  });

  // Delete endpoints
  router.delete('/users/:userId/forms', async (req, res) => {
    const response = await dal.del.userForms(req, res);
    return response;
  });

  router.delete('/users/:userId/forms/:formId', async (req, res) => {
    const answer = await dal.del.userForm(req, res);
    return answer;
  });

  // Create endpoints
  router.post('/users/:userId/forms', async (req, res) => {
    const response = await dal.create.userForms(req, res);
    return response;
  });

  router.post('/users/:userId/forms/:formId', async (req, res) => {
    const answer = await dal.create.userform(req, res);
    return answer;
  });

  // Update endpoints
  router.put('/users/:userId/forms', async (req, res) => {
    const response = await dal.read.userForms(req, res);
    return response;
  });

  router.put('/users/:userId/forms/:formId', async (req, res) => {
    const answer = await dal.read.userform(req, res);
    return answer;
  });

  return router;
};

module.exports = routes;
