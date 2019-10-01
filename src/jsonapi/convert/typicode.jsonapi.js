// This is an example function that does abosolutley nothing.
// If the data would be in the wrong format we could fix it here.
// The data object should match the data object structure defined in https://github.com/danivek/json-api-serializer
const createObjectFromApiResponse = data => data.data;

module.exports = createObjectFromApiResponse;
