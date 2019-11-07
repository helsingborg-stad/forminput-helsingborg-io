const logger = require('../../utils/logger');
const jsonapi = require('../../jsonapi');
const { ResourceNotFoundError } = require('../../utils/error');
const {
  fetchAllForms, fetchOneForm, postAnswer,
  deleteUserForms, deleteUserForm, updateAnswer
} = require('./forminput.db');

const createErrorResponse = async (error, res) => {
  logger.error('Error: ', error);
  const serializedData = await jsonapi.serializer.serializeError(error);
  return res.status(error.status).json(serializedData);
};

const createSuccessResponse = async (data, res, jsonapiType, converter = undefined) => {
  let dataToSerialize = data;

  if (converter) {
    dataToSerialize = await jsonapi.convert[converter](dataToSerialize);
  }

  const serializedData = await jsonapi.serializer.serialize(jsonapiType, dataToSerialize);
  return res.json(serializedData);
};

/**
 * CREATE RESOURCE METHODS
 */

const createAnswer = async (req, res) => {
  // Write method for creating a resource
  try {
    // Add Response data to DB
    await postAnswer(req.body);

    // Fetch data from DB.
    const { userId, formId } = req.body;
    const data = await fetchFormAnswers(userId, formId);

    return await createSuccessResponse(data, res, 'formInput');
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const create = {
  post: createAnswer,
};


/**
 * READ RESOURCE METHODS
 */

const readUserForms = async (req, res) => {
  // Write method for reading a resource (in this case a get request towards the testapi)
  try {
    const { userId } = req.params;
    const queryData = await fetchAllForms(userId);

    if (!queryData) {
      throw new ResourceNotFoundError('No forms could be found');
    }

    return await createSuccessResponse(queryData, res, 'answer', 'queryData');
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const readForm = async (req, res) => {
  // Write method for reading a resource (in this case a get request towards the testapi)
  try {
    const { formId, userId } = req.params;
    const queryData = await fetchOneForm(userId, formId);

    if (!queryData) {
      throw new ResourceNotFoundError(`The form with id ${formId} of the user ${userId} could not be found`);
    }

    return await createSuccessResponse(queryData, res, 'answer', 'queryData');
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const read = {
  userForms: readUserForms,
  userForm: readForm,
};


/**
 * UPDATE RESOURCE METHODS
 */


const updateOneResponse = async (req, res) => {
  try {
    const { body, params } = req
    await updateResponse(body);
    return createSuccessResponse(dataToSerialize, res, 'formInput');

  } catch (e) {
    return createErrorResponse(e, res);
  };
};


// const updateAllResponses = async (req, res) => {
//   try {
//     const { body, params } = req
//     return createSuccessResponse(dataToSerialize, res, 'formInput');

//   } catch (e) {
//     return await createErrorResponse(error, res)
//   };
// };


const update = {
  reponse: updateOneResponse,
  // responses: updateAllResponses,
};


/**
 * DELETE RESOURCE METHODS
 */

const deleteOneResponse = (req) => {
  // Write method for deleting a resource
};


const deleteAllResponses = (req) => {
  // Write method for deleting a resource
};

const del = {
  response: deleteOneResponse,
  responses: deleteAllResponses,
};


module.exports = {
  create,
  read,
  update,
  del,
};
