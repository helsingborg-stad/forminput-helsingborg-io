const express = require('express');

const person = require('./example/example.api');

const routes = () => {
  const router = express.Router();

  // Register route to api-layer.
  router.use('/', person());

  return router;
};


module.exports = routes;
