"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatContext = void 0;
function formatContext(handler) {
    return {
        memoryLimitInMb: 128,
        functionName: handler.name,
        functionVersion: "",
    };
}
exports.formatContext = formatContext;
