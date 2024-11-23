import type { FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";

export const setupSecurity = (app: FastifyInstance) => {
	app.register(helmet);
	app.register(rateLimit, { max: 100, timeWindow: "1 minute" });
};
