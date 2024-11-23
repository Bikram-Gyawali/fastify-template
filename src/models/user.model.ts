import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

const userSchema: Schema = new Schema({
	name: { type: String, required: true },

	email: { type: String, required: true, unique: true },
});

export const User = mongoose.model<IUser>("User", userSchema);