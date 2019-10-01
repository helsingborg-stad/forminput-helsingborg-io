const express = require('express');

const formInput = require('./forminput/forminput.api');

const routes = () => {
  const router = express.Router();

  // Register route to api-layer.
  router.use('/', formInput());

  return router;
};


module.exports = routes;
