import type { FastifyInstance } from "fastify";
import {
	createUserHandler,
	getUsersHandler,
} from "../controllers/user.controller";

const createUserSchema = {
	body: {
		type: "object",
		required: ["name", "email", "password"],
		properties: {
			name: { type: "string", minLength: 1 },
			email: { type: "string", format: "email" },
			password: { type: "string", minLength: 6 },
		},
	},
	response: {
		201: {
			type: "object",
			properties: {
				_id: { type: "string" },
				name: { type: "string" },
				email: { type: "string" },
			},
		},
	},
};

const getUsersSchema = {
	response: {
		200: {
			type: "array",
			items: {
				type: "object",
				properties: {
					_id: { type: "string" },
					name: { type: "string" },
					email: { type: "string" },
				},
			},
		},
	},
};

export default async (app: FastifyInstance) => {
	app.post("/", { schema: createUserSchema }, createUserHandler);
	app.get("/", { schema: getUsersSchema }, getUsersHandler);
};
