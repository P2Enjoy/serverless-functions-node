import type { Event } from "../types/types";
import { FastifyReply, FastifyRequest } from "fastify";
export declare function injectIngressHeaders(request: FastifyRequest, event: Event): void;
export declare function injectEgressHeaders(response: FastifyReply): void;
