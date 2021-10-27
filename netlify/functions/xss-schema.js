
const schema = require("../../bad-schema");

const isIntrospection = (operationName) => {
    return operationName?.toLowerCase() === "introspectionquery";
};

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const handleOptionsRequest = () => ({
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: "Successful preflight request" }),
})

module.exports.handler = async function (event) {
    if (event.httpMethod === "OPTIONS") {
        return handleOptionsRequest()
    }
    const operationName = event?.body ? JSON.parse(event.body)?.operationName : null
    return {
        statusCode: 200,
        body: JSON.stringify({ data: schema }),
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }
}
