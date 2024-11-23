import { User, type IUser } from "../models/user.model";

export const createUser = async (data: Partial<IUser>) => {
	return await User.create(data);
};

export const getUsers = async () => {
	return await User.find();
};
