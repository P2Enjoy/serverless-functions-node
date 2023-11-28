"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emulateCoreProcess = void 0;
const context_1 = require("./context");
const event_1 = require("./event");
const infra_1 = require("./infra");
const handleError = (reply, error) => {
    const message = error.message;
    console.error(message);
    reply.status(500).send(message);
};
const handleResponse = (reply, result) => {
    // By default, status code is 200
    reply.status(200);
    if (typeof result === "number") {
        result = result.toString();
    }
    else {
        const response = JSON.parse(JSON.stringify(result));
        if (response["statusCode"]) {
            reply.status(response["statusCode"]);
        }
        if (response["headers"]) {
            for (const header in response["headers"]) {
                reply.header(header, response["headers"][header]);
            }
        }
        if (response["body"]) {
            result = response["body"];
        }
    }
    return reply.send(result);
};
async function emulateCoreProcess(handler, request, reply) {
    const event = (0, event_1.formatHTTPEvent)(request);
    (0, infra_1.injectIngressHeaders)(request, event);
    const context = (0, context_1.formatContext)(handler);
    (0, infra_1.injectEgressHeaders)(reply);
    await emulateSubruntime(handler, event, context, request, reply);
}
exports.emulateCoreProcess = emulateCoreProcess;
async function emulateSubruntime(handler, event, context, request, reply) {
    let responseSentByCallback = false;
    const callback = (error, result) => {
        responseSentByCallback = true;
        return error ? handleError(reply, error) : handleResponse(reply, result);
    };
    try {
        const functionResult = await handler(event, context, callback);
        if (!responseSentByCallback) {
            return handleResponse(reply, functionResult);
        }
    }
    catch (err) {
        return handleError(reply, new Error(`function invocation failed: ${err}`));
    }
}
