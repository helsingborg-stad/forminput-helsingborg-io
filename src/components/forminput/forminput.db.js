const logger = require('../../utils/logger');
const { ResourceNotFoundError, throwCustomDomainError } = require('../../utils/error');
const { answers } = require('../../db/db.bookshelf');

// Fetch all the forms of a User
const fetchAllForms = async (userId) => {
  const Forms = await answers.where('user_id', userId).fetchAll();
  if (!Forms || (Forms.length === 0)) { logger.error('failed'); throw throwCustomDomainError(404); }
  return Forms;
};

// Fetch all the answers of a User for at specific form
const fetchOneForm = async (userId, formId) => {
  const data = await answers.where('user_id', userId).where('form_id', formId).fetchAll();
  if (!data || (data.length === 0)) { logger.error('failed'); throw throwCustomDomainError(404); }
  return data;
};

// Fetch a specific answer of a User for at specific form
const fetchOneAnswer = async (userId, formId, answerId) => {
  const answer = answers
    .where('user_id', userId)
    .where('form_id', formId)
    .where('id', answerId)
    .fetch();
  if (!answer || (answer.length === 0)) { logger.error('failed'); throw throwCustomDomainError(404); }
  return answer;
};

const postAnswer = async (answer) => {
  try {
    answers.forge({
      user_id: answer.userId,
      form_id: answer.formId,
      email: answer.email,
      question_type: answer.questionType,
      answer: answer.answer,
    })
      .save();
    return answer;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

// Delete All Answers of a user for a specific form
const deleteUserForms = async userId => answers.where('user_id', userId)
  .destroy()
  .then((res) => { logger.info('success', res); return ({ status: 200, message: `Success of Deletion of all forms of user ${userId}` }); })
  .catch((e) => { logger.error('failed', e); throw new ResourceNotFoundError(e.message); });

// Delete All Answers of a user for a specific form
const deleteUserForm = async (userId, formId) => answers.where('user_id', userId).where('form_id', formId)
  .destroy()
  .then((res) => { logger.info('success', res); return ({ status: 200, message: `Success of Deletion of form ${formId} of user ${userId}` }); })
  .catch((e) => { logger.error('failed', e); throw new ResourceNotFoundError(e.message); });

const updateAnswer = async (answer, params) => {
  const { answerId } = params;

  const fetchedAnswer = await answers.where('id', answerId).fetch();
  if (!fetchedAnswer) throw throwCustomDomainError(404);

  try {
    answers.forge({
      id: answerId,
      user_id: answer.userId || fetchedAnswer.user_Id,
      form_id: answer.formId || fetchedAnswer.form_id,
      question_type: answer.question_type || fetchedAnswer.question_type,
      answer: answer.answer || fetchedAnswer.answer,
      updated_at: answer.updated_at || new Date(),
      created_at: answer.created_at || fetchedAnswer.created_at,
    }).save();
    return ({ status: 200, message: `Updated answer ${answerId}` });
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

module.exports = {
  fetchAllForms,
  fetchOneForm,
  fetchOneAnswer,
  deleteUserForms,
  deleteUserForm,
  postAnswer,
  updateAnswer,
};
