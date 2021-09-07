
const schema = require("../../bad-schema");

const isIntrospection = (operationName) => {
  return operationName?.toLowerCase() === "introspectionquery";
};

const mockGraphQLServer = (operationName) => {
  return isIntrospection(operationName) ? { data: schema } : { data: {} };
};

module.exports.handler = async function (event) {
    const operationName = event?.body ? JSON.parse(event.body)?.operationName : null
    return {
      statusCode: 200,
      body: JSON.stringify(mockGraphQLServer(operationName)),
      headers: {
        'content-type': 'application/json'
      }
    }
  }
