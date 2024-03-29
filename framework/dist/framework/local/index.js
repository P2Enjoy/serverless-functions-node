"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveHandler = void 0;
const fastify_1 = require("fastify");
const plugin = require("@fastify/url-data");
const http_1 = require("./http");
const serving_1 = require("./serving");
function serveHandler(handler, port = 8080, host = "127.0.0.1") {
    let server = (0, fastify_1.fastify)();
    server.register(plugin);
    server.addContentTypeParser("text/json", { parseAs: "string" }, server.defaultTextParser);
    server.addContentTypeParser("application/x-www-form-urlencoded", { parseAs: "string" }, server.defaultTextParser);
    server.addContentTypeParser("application/json", { parseAs: "string" }, server.defaultTextParser);
    server.addContentTypeParser("multipart/form-data", function (request, payload, done) {
        let body = "";
        payload.on("data", d => {
            body += d;
        });
        payload.on("end", () => {
            done(null, body);
        });
    });
    // Emulate core preprocess
    server.addHook("preValidation", function (request, reply, done) {
        // Emulate the CoreRT guard
        if ((0, http_1.isRejectedRequest)(request)) {
            console.error("request will be rejected for calling favicon.ico or robots.txt");
        }
        if ((0, http_1.isValidContentLength)(request)) {
            console.error("request can be rejected because it's too big");
        }
        done();
    });
    server.addHook("onRequest", function (request, reply, done) {
        // These headers are added for convenience, but will be overwritten if set in the handler
        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Access-Control-Allow-Headers", "Content-Type");
        done();
    });
    const serverFactory = async (request, reply) => {
        await (0, serving_1.emulateCoreProcess)(handler, request, reply);
    };
    server.all("/*", serverFactory);
    server.listen({ host: host, port: port }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
    return server;
}
exports.serveHandler = serveHandler;
