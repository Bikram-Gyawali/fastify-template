import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const errorHandler = (
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { statusCode = 500 } = reply;
	reply.status(statusCode).send({
		error: {
			message: error.message,
			code: error.code || "INTERNAL_SERVER_ERROR",
		},
	});
};
