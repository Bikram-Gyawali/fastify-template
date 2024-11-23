import { createUser } from "../../services/user.service";

test("createUser creates a new user", async () => {
	const mockUser = {
		name: "John Doe",
		email: "john@example.com",
		password: "password123",
	};
	const result = await createUser(mockUser);
	expect(result.name).toBe("John Doe");
});
