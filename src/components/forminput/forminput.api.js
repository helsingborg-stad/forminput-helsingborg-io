const express = require('express');
const dal = require('./forminput.dal');
const { post, put } = require('./forminput.schema');
const Validator = require('../../middlewares/validator.middleware');

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
  router.get('/examples', async (req, res) => {
    const response = await dal.read.posts(req, res);
    return response;
  });

  router.get('/examples/:id', async (req, res) => {
    const response = await dal.read.post(req, res);
    return response;
  });

  router.post('/examples', Validator(post.example, 'body', true), async (req, res) => {
    const response = await dal.create.post(req);
    return res.json(response);
  });

  router.patch('/examples/:id', Validator(put.example, 'body', true), async (req, res) => {
    const response = await dal.update.post(req);
    return res.json(response);
  });

  return router;
};

module.exports = routes;
