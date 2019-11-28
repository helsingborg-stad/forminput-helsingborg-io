const jsonapi = require('../../jsonapi');
const { ResourceNotFoundError } = require('../../utils/error');
const {
  fetchAllForms, fetchOneForm, postAnswer,
  deleteUserForms, deleteUserForm, updateAnswer,
} = require('./forminput.db');

const createErrorResponse = async (error, res) => {
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

const parseAnswer = body => ({ ...body, answer: body.answer.join(',') });
/**
 * CREATE RESOURCE METHODS
 */

const createAnswer = async (req, res) => {
  // Write method for creating a resource
  try {
    // Add Response data to DB
    const { questionType, answer } = req.body;
    const parsedAnswer = (questionType === 'multiple' && answer instanceof Array) ? parseAnswer(req.body) : req.body;
    const data = await postAnswer(parsedAnswer);

    return await createSuccessResponse(data, res, 'answer');
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const create = {
  answer: createAnswer,
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


const updateOneAnswer = async (req, res) => {
  try {
    const { body } = req;

    const parsedAnswer = (body.questionType === 'single') ? body : parseAnswer(body);
    const dataToSerialize = await updateAnswer(parsedAnswer);

    return createSuccessResponse(dataToSerialize, res, 'answer');
  } catch (e) {
    return createErrorResponse(e, res);
  }
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
  answer: updateOneAnswer,
  // answers: updateAllAnswers,
};


/**
 * DELETE RESOURCE METHODS
 */

const deleteForms = async (req, res) => {
  try {
    const { userId } = req.params;
    const dataToSerialize = await deleteUserForms(userId);
    return createSuccessResponse(dataToSerialize, res, 'answer');
  } catch (e) {
    return createErrorResponse(e, res);
  }
};


const deleteForm = async (req, res) => {
  try {
    const { userId, formId } = req.params;
    const dataToSerialize = await deleteUserForm(userId, formId);
    return createSuccessResponse(dataToSerialize, res, 'answer');
  } catch (e) {
    return createErrorResponse(e, res);
  }
};

const del = {
  userForms: deleteForms,
  userForm: deleteForm,
};


module.exports = {
  create,
  read,
  update,
  del,
};
