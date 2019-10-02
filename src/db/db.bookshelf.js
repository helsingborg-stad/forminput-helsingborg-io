const { bookshelf } = require('./db.client');

bookshelf.plugin('registry');

const Responses = bookshelf.Model.extend({
  tableName: 'responses',
  requireFetch: false,
  hasTimestamps: true,
});

module.exports = {
  Responses,
};
