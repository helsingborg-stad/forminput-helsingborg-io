const logger = require('../../utils/logger');
const { ResourceNotFoundError } = require('../../utils/error');
const { answers } = require('../../db/db.bookshelf');

// Fetch all the forms of a User
const fetchAllForms = async (userId) => {
  const Forms = await answers.where('user_id', userId)
    .fetchAll()
    .then((res) => { logger.info('success'); return res; })
    .catch((e) => { logger.error('failed', e); return e; });
  return Forms;
};

// Fetch all the answers of a User for at specific form
const fetchOneForm = async (userId, formId) => {
  const data = await answers.where('user_id', userId).where('form_id', formId)
    .fetchAll()
    .then((res) => { logger.info('success'); return res; })
    .catch((e) => { logger.error('failed', e); return e; });
  return data;
};

// Fetch a specific answer of a User for at specific form
const fetchOneAnswer = async (userId, formId, answerId) => {
  const answer = answers
    .where('user_id', userId)
    .where('form_id', formId)
    .where('id', answerId)
    .fetch()
    .then((res) => { logger.info('success'); return res; })
    .catch((e) => { logger.error('failed', e); return e; });
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
const deleteUserForms = async (userId) => {
  try {
    answers.where('user_id', userId)
      .destroy()
      .then((res) => { logger.info('success'); return res.json({ success: true }); })
      .catch((e) => { logger.error('failed', e); return e; });
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

// Delete All Answers of a user for a specific form
const deleteUserForm = async (userId, formId) => {
  try {
    answers.where('user_id', userId).where('form_id', formId)
      .destroy()
      .then((res) => { logger.info('success'); return res.json({ success: true }); })
      .catch((e) => { logger.error('failed', e); return e; });
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

const updateAnswer = async (answer) => {
  const { userId, formId, answerId } = answer;
  answers
    .where('user_id', userId)
    .where('form_id', formId)
    .where('id', answerId)
    .fetch()
    .then(res => res.save(
      {
        user_id: answer.userId || res.user_Id,
        form_id: answer.formId || res.form_id,
        email: answer.email || res.email,
        question_type: answer.questionType || res.question_type,
        answer: answer.answer || res.answer,
        updated_at: answer.updated_at || new Date(),
        created_at: answer.created_at || res.created_at,
      },
      {
        method: 'update',
        patch: true,
      },
    ).then(updated => updated))
    .catch((e) => { logger.error('failed', e); return new ResourceNotFoundError(); });
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
