const Serializer = require('./serializer.jsonapi');
const createObjectFromKnexQuery = require('./convert/knex.jsonapi');
const createObjectFromApiResponse = require('./convert/typicode.jsonapi');

/**
 * Export
 * serializer: instance of json-api-serializer
 * convert: helper functions to convert data to serializable objects.
 */

module.exports = {
  serializer: Serializer,
  convert: {
    queryData: createObjectFromKnexQuery,
    apiResponse: createObjectFromApiResponse,
  },
};
