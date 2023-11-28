import { FastifyReply, FastifyRequest } from "fastify";
import { Handler } from "../types/types";
export declare function emulateCoreProcess(handler: Handler, request: FastifyRequest, reply: FastifyReply): Promise<void>;
