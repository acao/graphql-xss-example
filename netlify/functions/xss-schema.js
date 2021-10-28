
const schema = require("../../bad-schema");

const isIntrospection = (operationName) => {
    return operationName?.toLowerCase() === "introspectionquery";
};

const headers = (requestHeaders)  => ({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": requestHeaders['access-control-request-headers'] || "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Vary": "Access-Control-Request-Headers",
})

const handleOptionsRequest = (requestHeaders) => ({
    statusCode: 200,
    headers: headers(requestHeaders),
    body: JSON.stringify({ message: "Successful preflight request" }),
})

module.exports.handler = async function (event) {
    if (event.httpMethod === "OPTIONS") {
        return handleOptionsRequest(event.headers)
    }
    const operationName = event?.body ? JSON.parse(event.body)?.operationName : null
    return {
        statusCode: 200,
        body: JSON.stringify({ data: schema }),
        headers: {
            ...(headers(event.headers)),
            'Content-Type': 'application/json'
        }
    }
}
