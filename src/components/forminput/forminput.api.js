const express = require('express');
const dal = require('./forminput.dal');
const { post, put, query } = require('./forminput.schema');
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
  router.get('/users/:userId/forms', Validator(query.user, 'params', true), async (req, res) => {
    const answer = await dal.read.userForms(req, res);
    return answer;
  });

  router.get('/users/:userId/forms/:formId', Validator(query.forms, 'params', true), async (req, res) => {
    const answer = await dal.read.userForm(req, res);
    return answer;
  });

  // Delete endpoints
  router.delete('/users/:userId/forms', Validator(query.user, 'params', true), async (req, res) => {
    const answer = await dal.del.userForms(req, res);
    return answer;
  });

  router.delete('/users/:userId/forms/:formId', Validator(query.forms, 'params', true), async (req, res) => {
    const answer = await dal.del.userForm(req, res);
    return answer;
  });

  // Create endpoints
  router.post('/answers', Validator(post.validation, 'body', true), async (req, res) => {
    const answer = await dal.create.answer(req, res);
    return answer;
  });

  // Update endpoints
  router.put('/answers', Validator(put.validation, 'body', true), async (req, res) => {
    const answer = await dal.update.answer(req, res);
    return answer;
  });

  return router;
};

module.exports = routes;
