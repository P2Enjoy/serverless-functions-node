"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidContentLength = exports.isRejectedRequest = void 0;
const MAX_CONTENT_LENGTH = 6291456;
function isRejectedRequest(request) {
    return (request.url.toString() == "/favicon.ico" ||
        request.url.toString() == "/robots.txt");
}
exports.isRejectedRequest = isRejectedRequest;
function isValidContentLength(request) {
    if (request.headers["content-length"]) {
        const length = +request.headers["content-length"];
        return length > MAX_CONTENT_LENGTH;
    }
    return false;
}
exports.isValidContentLength = isValidContentLength;
