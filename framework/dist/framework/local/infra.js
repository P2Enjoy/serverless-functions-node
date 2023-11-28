"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectEgressHeaders = exports.injectIngressHeaders = void 0;
const crypto_1 = require("crypto");
// Inject headers for incoming requests.
function injectIngressHeaders(request, event) {
    const headers = event.headers;
    headers["Forwarded"] = `for=${request.ip};proto=http`;
    headers["X-Forwarded-For"] = request.ip;
    headers["K-Proxy-Request"] = "activator";
    headers["X-Forwarded-Proto"] = "http";
    headers["X-Envoy-External-Address"] = request.ip;
    headers["X-Request-Id"] = (0, crypto_1.randomUUID)();
    event.headers = headers;
}
exports.injectIngressHeaders = injectIngressHeaders;
// Inject headers for outgoing requests.
function injectEgressHeaders(response) {
    response.header("server", "envoy");
}
exports.injectEgressHeaders = injectEgressHeaders;
