import fastify from "fastify";
import { connectDB, disconnectDB } from "./config/db";
import { setupSwagger } from "./plugins/swagger";
import { setupSecurity } from "./plugins/security.plugin";
import userRoutes from "./routes/user.routes";
import { apiCallLogs } from "./plugins/console.plugin";
import { errorHandler } from "./utils/errorHandler";
import fastifyCors from "@fastify/cors";

const app = fastify({ logger: true });

// Plugins
app.setErrorHandler(errorHandler);
setupSecurity(app);
setupSwagger(app);
app.register(fastifyCors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// MongoDB Connection
connectDB();
// Register Routes
app.register(apiCallLogs);
app.register(userRoutes, { prefix: "/api/users" });

app.get("/health", async (request, reply) => {
	return { status: "ok" };
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
	app.log.error(`Uncaught Exception: ${err.message}`);
	app.log.error(err.stack);
	process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
	app.log.error("Unhandled Rejection at:", promise);
	app.log.error("Reason:", reason);
	process.exit(1);
});

const shutdown = async () => {
	app.log.info("Shutting down gracefully...");
	await disconnectDB();
	await app.close();
	process.exit(0);
};

//   process.on('SIGINT', shutdown);
//   process.on('SIGTERM', shutdown);

// Start Server
const start = async () => {
	try {
		await app.listen({ port: 3000 });
		app.log.info("Server running at http://localhost:3000");
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
