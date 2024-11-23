import mongoose from "mongoose";
import { config } from "./environment";

export const connectDB = async () => {
	try {
		await mongoose.connect(config.MONGO_URI);
		console.log("MongoDB connected...");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

export const disconnectDB = async () => {
	try {
		await mongoose.disconnect();
		console.log("MongoDB disconnected...");
	} catch (error) {
		console.error("Error disconnecting from MongoDB:", error);
	}
};
