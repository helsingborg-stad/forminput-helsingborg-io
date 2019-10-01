require('dotenv').config();

const express = require('express');
const https = require('https');
const pino = require('express-pino-logger');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const jsonSchemaRefParser = require('json-schema-ref-parser');
const swaggerDocument = require('../swagger/swagger.js');
const routes = require('./components/routes');
const logger = require('./utils/logger');
// const WebSocketServer = require('./ws.server');

/**
 * Enviorment Variabels
 */
const { PORT, API_BASE } = process.env;

/**
 * Init App
 */
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Logging
 */
app.use(pino({ logger }));

/**
 * Routes
 */

app.use(routes());

/**
 * Swagger
 * Access documentation through localhost:xxxx/api-docs.
 */

jsonSchemaRefParser.dereference(swaggerDocument, (err, schema) => {
  if (err) {
    console.error(err);
  } else {
    // `schema` is just a normal JavaScript object that contains your entire JSON Schema,
    // including referenced files, combined into a single object
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(schema));
  }
});

/**
 * Create WebSocket server
 */

// const webSocketServer = new WebSocketServer(app, `${API_BASE}/ws`);


/**
 * Start
 * Listen on port specfied in env-file.
 */

const server = app.listen({ port: PORT }, async () => {
  logger.info(`Server started on port ${PORT}`);
  // webSocketServer.start();
});

// Export server to use it in tests.
module.exports = server;
