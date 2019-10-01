const { BASE_URL } = process.env;

/**
 * Schema
 * A schema should define a single resource that we want to return as a response.
 */

const formJsonApiSchema = {
  id: 'id',
  blacklist: ['userId'], // blacklist keys that you don't want to show in the reponse object.
  links: {
    self(data) {
      return `${BASE_URL}/examples/${data.id}`; //
    },
  },
  topLevelLinks: {
    self: `${BASE_URL}/examples`,
  },
};

module.exports = formJsonApiSchema;
