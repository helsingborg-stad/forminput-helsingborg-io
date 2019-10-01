const Joi = require('@hapi/joi');
const { id, limit } = require('../../validation/global.schema');

/**
 * POST SCHEMAS
 */

const examplePostValidaionSchema = Joi.object().keys({
  title: Joi.string().min(5).max(24).required(),
  body: Joi.string().min(5).max(200),
})

const post  = {
  example: examplePostValidaionSchema,
}


/**
 * PUT SCHEMAS
 */

const examplePutValidaionSchema = Joi.object().keys({
  id,
  title: Joi.string().min(5).max(24),
  body: Joi.string().min(5).max(200),
})

const put  = {
  example: examplePutValidaionSchema,
};


/**
 * QUERY SCHEMAS
 */

const queryExampleValidationSchema = Joi.object().keys({
  id,
  limit,
});

const query = {
  example: queryExampleValidationSchema
}

module.exports = {
  post,
  put,
  query,
};
