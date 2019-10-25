/* eslint-disable no-use-before-define */
const { bookshelf } = require('./db.client');

const Answers = bookshelf.Model.extend({
  tableName: 'answers',
  requireFetch: false,
  hasTimestamps: true,
});

module.exports = {
  answers: bookshelf.model('Answers', Answers),
};
