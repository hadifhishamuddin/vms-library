const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Visitor = require("./visitor")
const User = require("./user")

describe("User Account Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@Sandbox.mktdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		Visitor.injectDB(client);
        User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await Visitor.register("visitor-username", "correct-password", "visitor", 60193459191)
		expect(res).toBe("New user registrated")
	})

	test("Duplicate username", async () => {
		const res = await Visitor.register("visitor-username", "another-password", "visitor", 6060606060)
		expect(res).toBe("Duplicate username")
	})

	test("User login, invalid username", async () => {
		const res = await Visitor.login("wrong-username", "correct-password")
		expect(res).toBe("Invalid username")
	})

	test("User login, invalid password", async () => {
		const res = await Visitor.login("visitor-username", "wrong-password")
		expect(res).toBe("Invalid password") 
	})

	test("User login, successfully", async () => {
		const res = await Visitor.login("visitor-username", "correct-password")
		expect(res).toMatchObject({
			_id: expect.any(ObjectId),
			username: expect.any(String),
			phonenumber: expect.any(Number),
			role: expect.any(String)
		});
	})

	test("User update booking, wrong username", async () => {
		const res = await Visitor.booking("wrong-username", "correct-password", "Cinderella", "30/1/2023", "30/2/2023")
		expect(res).toBe("Invalid username") 
	})

	test("User update booking, wrong password", async () => {
		const res = await Visitor.booking("visitor-username", "wrong-password", "Cinderella", "30/1/2023", "30/2/2023")
		expect(res).toBe("Invalid password") 
	})

	test("User update booking, successfully", async () => {
		const res = await Visitor.booking("visitor-username", "correct-password", "Cinderella", "30/1/2023", "30/2/2023")
		expect(res).toMatchObject({
			_id: expect.any(ObjectId),
			username: expect.any(String),
			phonenumber: expect.any(Number),
            book: expect.any(String),
            borrowdate: expect.any(String),
            returndate: expect.any(String)
		});	
	})

	test("User update returning, wrong username", async () => {
		const res = await Visitor.returning("wrong-username", "correct-password", "Cinderella")
		expect(res).toBe("Invalid username") 
	})

	test("User update returning, wrong password", async () => {
		const res = await Visitor.returning("visitor-username", "wrong-password", "Cinderella")
		expect(res).toBe("Invalid password") 
	})

    test("User update returning, wrong book", async () => {
		const res = await Visitor.returning("visitor-username", "correct-password", "Cinde tak rella")
		expect(res).toBe("Invalid book") 
	})

	test("User update returning, successfully", async () => {
		const res = await Visitor.returning("visitor-username", "correct-password", "Cinderella")
		expect(res).toMatchObject({
			_id: expect.any(ObjectId),
			username: expect.any(String),
			phonenumber: expect.any(Number),
            book: expect.any(String),
            borrowdate: expect.any(String),
            returndate: expect.any(String)
		});	
	})

    test("User find visitor, invalid username", async () => {
		const res = await Visitor.findVisitor("wrong-username")
		expect(res).toBe("Invalid username")
	})

	test("User find visitor, successfully", async () => {
		const res = await Visitor.findVisitor("visitor-username")
		expect(res).toMatchObject({
			_id: expect.any(ObjectId),
			username: expect.any(String),
			phonenumber: expect.any(Number),
			role: expect.any(String)
		});
	})

    test("User delete successfully", async () => {
		const res = await User.delete("visitor-username", "correct-password")
		expect(res).toBe("Delete successfully") 
	})
    
});