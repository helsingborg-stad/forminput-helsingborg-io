const { BASE_URL } = process.env;

/**
 * Schema
 * A schema should define a single resource that we want to return as a response.
 */
const answerJsonApiSchema = {
  id: 'id',
  links: {
    self(data) {
      return `${BASE_URL}/answers/${data.id}`; //
    },
  },
  topLevelMeta(data, extraData) {
    return {
      count: extraData.count,
      total: data.length,
    };
  },
  topLevelLinks: {
    self: `${BASE_URL}/answers`,
  },
};

module.exports = answerJsonApiSchema;
