const bcrypt = require('bcrypt');
let users;

class User {
	static async injectDB(conn) {
		// users = await conn.db("week7").collection("users")
		users = await conn.db("vms-museum").collection("DATABASES")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} phone 
	 * @param {*} role
	 * @param {*} newphone
	 * @param {*} newpassword
	 */
	
	static async register(username, password, role, phone) {
		// TODO: Check if username exists
		const Duplicate = await users.findOne({username:username})

		if(Duplicate){
			return "Duplicate username"
		}

		// TODO: Hash password
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt)

		// TODO: Save user to database
		await users.insertOne({
			username: username,
			password: hashed,
			role: role,
			phonenumber: phone,
		})
		return "New user registrated"
	}

	static async login(username, password) {
		// TODO: Check if username exists
		const user = await users.findOne({username: username})

		if(!user){
			return "Invalid username"
		}

		// TODO: Validate password
		const valid = await bcrypt.compare(password, user.password)

		if(!valid){
			return "Invalid password"
		}

		// TODO: Return user object
		return user;
	}

	//update phonenumber and password
	static async update(username, password, newphone, newpassword) {
		// TODO: Check if username exists
		const user = await users.findOne({username: username})

		if(!user){
			return "Invalid username"
		}

		// TODO: Validate password
		const valid = await bcrypt.compare(password, user.password)

		if(!valid){
			return "Invalid password"
		}

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(newpassword, salt)
		// TODO: Update user from database
		await users.updateOne(
			{username: username},
			{$set: { 
				phonenumber: newphone ,
				password: hashed
			}}
			);
		
		// TODO: Return userr object
		const userr = await users.findOne({username: username})
		return userr;
	}

	//delete admin/security/visitor
	static async delete(username, password) {
		// TODO: Check if username exists
		const user = await users.findOne({username: username})

		if(!user){
			return "Invalid username"
		}

		// TODO: Validate password
		const valid = await bcrypt.compare(password, user.password)

		if(!valid){
			return "Invalid password"
		}

		// TODO: Delete user from database
		await users.deleteOne({username: username})
		return "Delete successfully"
	}
}

module.exports = User;