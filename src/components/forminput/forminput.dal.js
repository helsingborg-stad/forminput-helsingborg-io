const axios = require('axios');
const { axiosOptions } = require('../../utils/constants');
const { responseSchema } = require('./forminput.schema');
const { validate } = require('../../validation/validation');
const logger = require('../../utils/logger');
const jsonapi = require('../../jsonapi');
const { throwCustomDomainError } = require('../../utils/error')

const createErrorResponse = async (error, res) => {
  logger.error(error);
  const serializedData = await jsonapi.serializer.serializeError(error);
  return res.status(error.status).json(serializedData);
};

const createSuccessResponse = async (data, res, jsonapiType, converter = undefined) => {
  let dataToSerialize = data
  
  if (converter){
    dataToSerialize = await jsonapi.convert[converter](dataToSerialize);
  }
  
  const serializedData = await jsonapi.serializer.serialize(jsonapiType, dataToSerialize);
  return res.json(serializedData)
};

const tryAxiosRequest = async (callback) => {
  try {
    const response = await callback()
    return response
  } catch (error){
    throwCustomDomainError(error.response.status)
  }
};


/**
 * CREATE RESOURCE METHODS
 */

const createPost = async (req, res) => {
  // Write method for creating a resource
  try {
    const { body } = req
    // Here we handle the creation of a resource

    // In this case we create a fake response by returning the request body params.
    const dataToSerialize = {id: "10", body: body.body, title: body.title }
    return await createSuccessResponse(dataToSerialize, res, 'example');

  } catch (e) {
    console.log(e)
    return await createErrorResponse(error, res)
  };
};

const create = {
  post: createPost,
};


/**
 * READ RESOURCE METHODS
 */

const fetchAllPosts = async (req, res) => {
  // Write method for reading a resource (in this case a get request towards the testapi)
  try {
    const testApiUrl = 'https://jsonplaceholder.typicode.com/posts';

    const resourceData = await tryAxiosRequest( callback = () => axios.get(testApiUrl, axiosOptions));

    return createSuccessResponse(resourceData, res, 'example', 'apiResponse');
  } catch (error) {
    return createErrorResponse(error, res)
  }
};

const fetchOnePost = async (req, res) => {
  // Write method for reading a resource (in this case a get request towards the testapi)
  try {
    const { id } = req.params
    const testApiUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;

    const resourceData = await tryAxiosRequest( callback = () => axios.get(testApiUrl, axiosOptions) );

    return await createSuccessResponse(resourceData, res, 'example', 'apiResponse');
  } catch (error) {
    return await createErrorResponse(error, res)
  }
};

const read = {
  posts: fetchAllPosts,
  post: fetchOnePost,
};


/**
 * UPDATE RESOURCE METHODS
 */


const updatePost = async (req, res) => {
  try {
    const { body, params } = req
    // Here we handle the creation of a resource
    // Check if resource exsists
    const testApiUrl = `https://jsonplaceholder.typicode.com/posts/${params.id}`;

    const resourceData = await client
      .get(testApiUrl);

    if (Object.keys(resourceData.data).length < 0) {
        throwCustomDomainError(404);
    }

    // In this case we create a fake response by returning the request body params.
    const dataToSerialize = {id: params.id, title: body.title }
 
    return createSuccessResponse(dataToSerialize, res, 'example');

  } catch (e) {
    return await createErrorResponse(error, res)
  };
};

const update = {
  post: updatePost,
};


/**
 * DELETE RESOURCE METHODS
 */

const deleteResourceMethod = (req) => {
  // Write method for deleting a resource
};

const del = {
  resource: deleteResourceMethod,
};


module.exports = {
  create,
  read,
  update,
  del,
};
