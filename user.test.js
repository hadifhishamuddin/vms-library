const MongoClient = require("mongodb").MongoClient;
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
		const res = await User.register("malik", "20cc", "0184342222")
		expect(res).toBe("New user registrated")
	})

	test("Duplicate username", async () => {
		const res = await User.register("malik", "45hsjs","0193459191")
		expect(res).toBe("Duplicate username")
	})

	test("User login invalid username", async () => {
		const res = await User.login("kamal", "20cc")
		expect(res).toBe("Invalid username")
	})

	test("User login invalid password", async () => {
		const res = await User.login("malik", "4545asdf")
		expect(res).toBe("Invalid password") 
	})

	test("User login successfully", async () => {
		const res = await User.login("malik", "20cc")
		expect(res).toBe("Login successfully")
	})

	test("User update wrong username", async () => {
		const res = await User.update("kamal", "20cc", "0130001111")
		expect(res).toBe("Invalid username") 
	})

	test("User update wrong password", async () => {
		const res = await User.update("malik", "hashdkandnsadjn", "0130001111")
		expect(res).toBe("Invalid password") 
	})

	// test("User update successfully", async () => {
	// 	//const res = await User.update("malik", "20cc", "0130001111")
	// 	const res = await User.update("farhan", "33cc", "0154447777")
	// 	expect(res).toBe("Update successfully") 
	// 	expect(res).toEqual(
	// 		expect.objectContaining({
	// 			// _id: "627e0ff26fbe85100655686a",		//res._id
	// 			password: "33cc",							//res.name
	// 			phonenumber: "0154447777",				//res.phone
	// 			username: "farhan",

	// 			//  _id: expect.any(String),
	// 			password: expect.any(String),
	// 			phonenumber: expect.any(Number),
	// 			username: expect.any(String),
	// 		})
	// 	);
			
	// })

	test("User delete wrong username", async () => {
		const res = await User.delete("balik", "20cc")
		expect(res).toBe("Invalid username") 
	})

	test("User delete wrong password", async () => {
		const res = await User.delete("malik", "hashdkandnsadjn")
		expect(res).toBe("Invalid password") 
	})

	test("User delete successfully", async () => {
		const res = await User.delete("malik", "20cc")
		expect(res).toBe("Delete successfully") 
	})

});