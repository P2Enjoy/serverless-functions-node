"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatHTTPEvent = void 0;
function formatRequestContext(request) {
    return {
        accountId: "",
        resourceId: "",
        stage: "",
        requestId: "",
        resourcePath: "",
        authorizer: null,
        httpMethod: request.method,
        apiId: "",
    };
}
function formatRequestHeaders(headers) {
    const formattedHeader = {};
    for (const key in headers) {
        formattedHeader[key] = headers[key];
    }
    return formattedHeader;
}
function formatRequestParams(request) {
    const formattedParam = {};
    const jsonParam = JSON.parse(JSON.stringify(request.query));
    for (const param in jsonParam) {
        formattedParam[param] = jsonParam[param];
    }
    return formattedParam;
}
function formatHTTPEvent(request) {
    let body = "";
    if (request.body) {
        body = request.body;
    }
    const isBase64Encoded = Buffer.from(body, "base64").toString("base64") === body;
    return {
        resource: "",
        path: request.urlData().path,
        httpMethod: request.method,
        headers: formatRequestHeaders(request.headers),
        multiValueHeaders: null,
        queryStringParameters: formatRequestParams(request),
        multiValueQueryStringParameters: null,
        pathParameters: null,
        stageVariables: {},
        requestContext: formatRequestContext(request),
        body: body,
        isBase64Encoded: isBase64Encoded,
    };
}
exports.formatHTTPEvent = formatHTTPEvent;
