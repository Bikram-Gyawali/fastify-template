import type { FastifyInstance } from "fastify";

export const apiCallLogs = async (app: FastifyInstance) => {
	app.addHook("onRequest", async (request, reply) => {
		const { method, url } = request;
		app.log.info(`Incoming request: ${method} ${url}`);
	});

	app.addHook("onResponse", async (request, reply) => {
		const { method, url } = request;
		app.log.info(
			`Response sent for: ${method} ${url} - Status: ${reply.statusCode}`,
		);
	});
};
