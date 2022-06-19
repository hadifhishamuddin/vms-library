const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Security = require("./security")
const User = require("./user")

describe("User Account Management", () => {
	
    let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@Sandbox.mktdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		Security.injectDB(client);
        User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await Security.register("security-username", "correct-password","security 02", "admin", 60113450001)
		expect(res).toBe("New user registrated")
	})

	test("Duplicate username", async () => {
		const res = await Security.register("security-username", "another-password","security 03", "admin", 6060606060)
		expect(res).toBe("Duplicate username")
	})

	test("Security login invalid username", async () => {
		const res = await Security.login("wrong-username", "correct-password")
		expect(res).toBe("Invalid username")
	})

	test("Security login invalid password", async () => {
		const res = await Security.login("security-username", "wrong-password")
		expect(res).toBe("Invalid password") 
	})

	test("Security login successfully", async () => {
		const res = await Security.login("security-username", "correct-password")
		expect(res).toMatchObject({
			_id: expect.any(ObjectId),
			username: expect.any(String),
			phonenumber: expect.any(Number),
			role: expect.any(String),
            securityID: expect.any(String)
		});
	})

	test("User delete successfully", async () => {
		const res = await User.delete("security-username", "correct-password")
		expect(res).toBe("Delete successfully") 
	})

});