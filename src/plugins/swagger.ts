import type { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const setupSwagger = (app: FastifyInstance) => {
	// Register the Swagger plugin
	app.register(fastifySwagger, {
		swagger: {
			info: {
				title: "Fastify API",
				description: "API documentation for the Fastify TypeScript app",
				version: "1.0.0",
			},
			consumes: ["application/json"],
			produces: ["application/json"],
		},
	});

	// Register the Swagger-UI plugin for the UI
	app.register(fastifySwaggerUi, {
		routePrefix: "/docs", // Expose the documentation UI at this path
		uiConfig: {
			docExpansion: "list", // Expand or collapse the API docs list
			deepLinking: true,
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
	});
};
