const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId;
const User = require("./user")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@Sandbox.mktdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("correct-username", "correct-password", "admin", 60193459191)
		expect(res).toBe("New user registrated")
	})

	test("Duplicate username", async () => {
		const res = await User.register("correct-username", "another-password", "admin", 6060606060)
		expect(res).toBe("Duplicate username")
	})

	test("User login invalid username", async () => {
		const res = await User.login("wrong-username", "correct-password")
		expect(res).toBe("Invalid username")
	})

	test("User login invalid password", async () => {
		const res = await User.login("correct-username", "wrong-password")
		expect(res).toBe("Invalid password") 
	})

	test("User login successfully", async () => {
		const res = await User.login("correct-username", "correct-password")
		expect(res).toMatchObject({
			_id: expect.any(ObjectId),
			username: expect.any(String),
			phonenumber: expect.any(Number),
			role: expect.any(String)
		});
	})

	test("User update wrong username", async () => {
		const res = await User.update("wrong-username", "correct-password", 60130001111, "new-password")
		expect(res).toBe("Invalid username") 
	})

	test("User update wrong password", async () => {
		const res = await User.update("correct-username", "wrong-password", 60130001111, "new-password")
		expect(res).toBe("Invalid password") 
	})

	test("User update successfully", async () => {
		const res = await User.update("correct-username", "correct-password", 60130001111, "new-password")
		expect(res).toMatchObject({
			_id: expect.any(ObjectId),
			username: expect.any(String),
			phonenumber: expect.any(Number),
		}
		);
			
	})

	test("User delete wrong username", async () => {
		const res = await User.delete("wrong-username", "new-password")
		expect(res).toBe("Invalid username") 
	})

	test("User delete wrong password", async () => {
		const res = await User.delete("correct-username", "wrong-password")
		expect(res).toBe("Invalid password") 
	})

	test("User delete successfully", async () => {
		const res = await User.delete("correct-username", "new-password")
		expect(res).toBe("Delete successfully") 
	})

});