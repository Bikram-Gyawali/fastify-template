import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const authMiddleware = async (app: FastifyInstance) => {
	app.addHook(
		"preHandler",

		async (request: FastifyRequest, reply: FastifyReply) => {
			const token = request.headers.authorization;
			if (!token) {
				reply
					.status(401)
					.send({ error: "Unauthorized: Missing Authorization Header" });
			}
			// You can add further token validation logic here.
		},
	);
};

export default authMiddleware;
