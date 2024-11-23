import type { FastifyRequest, FastifyReply } from "fastify";
import { createUser, getUsers } from "../services/user.service";
import type { IUser } from "../models/user.model";

export const createUserHandler = async (
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	const user = await createUser(req.body as Partial<IUser>);
	reply.status(201).send(user);
};

export const getUsersHandler = async (
	_req: FastifyRequest,
	reply: FastifyReply,
) => {
	const users = await getUsers();
	reply.send(users);
};
