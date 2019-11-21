const Joi = require('@hapi/joi');
const { id } = require('../../validation/global.schema');

/**
 * POST SCHEMAS
 */

const PostValidaionSchema = Joi.object().keys({
  userId: Joi.number().required(),
  formId: Joi.number().required(),
  answer: Joi.required(),
  questionType: Joi.string().min(5).max(24).required(),
});

const post = {
  validation: PostValidaionSchema,
};


/**
 * PUT SCHEMAS
 */

const PutValidaionSchema = Joi.object().keys({
  id,
  userId: Joi.number().required(),
  formId: Joi.number().required(),
  answer: Joi.string().required(),
  questionType: Joi.string().min(5).max(24).required(),
});

const put = {
  validation: PutValidaionSchema,
};


/**
 * QUERY SCHEMAS
 */

const queryFormsValidationSchema = Joi.object().keys({
  userId: Joi.number().required(),
  formId: Joi.number().required(),
});

const queryUserValidationSchema = Joi.object().keys({
  userId: Joi.number().required(),
});


const query = {
  forms: queryFormsValidationSchema,
  user: queryUserValidationSchema,
};

module.exports = {
  post,
  put,
  query,
};
