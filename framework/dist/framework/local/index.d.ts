import { FastifyInstance } from "fastify";
import { Handler } from "../types/types";
export declare function serveHandler(handler: Handler, port?: number, host?: string): FastifyInstance;
