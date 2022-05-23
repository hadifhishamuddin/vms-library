let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("week7").collection("users")
	}

	/**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} phone 
	 */
	static async register(username, password, phone) {
		// TODO: Check if username exists
		const Duplicate = await users.findOne({username:username})

		if(Duplicate){
			return "Duplicate username"
		}

		// TODO: Hash password
		//const salt = await bcrypt.genSalt(10);
		//const hashed = await bcrypt.hash(password, salt)

		// TODO: Save user to database
		else{ await users.insertOne({
			username: username,
			password: password,
			phonenumber: phone,
		})
		return "New user registrated"
		}
		// faker.js
		// return
	}

	static async login(username, password) {
		// TODO: Check if username exists
		const user = await users.findOne({username: username})

		if(!user){
			return "Invalid username"
		}

		// TODO: Validate password
		//const valid = await bcrypt.compare(password, user.password)

		//if(!valid){
		//	return { status: "invalid password"}
		//}

		else {
			if(user.password==password){
				//return "Login successfully"
				return user
			}
			else{
				return "Invalid password"
			}
		}
		//return "Login successfully"

		// TODO: Return user object
		//return user;

		// faker.js
		//return
	}

	static async delete(username, password) {
		// TODO: Check if username exists
		const user = await users.findOne({username: username})

		if(!user){
			return "Invalid username"
		}

		// TODO: Validate password
		//const valid = await bcrypt.compare(password, user.password)

		//if(!valid){
		//	return { status: "invalid password"}
		//}

		else {
			if(user.password==password){
				await users.deleteOne({username: username})
				return "Delete successfully"
			}
			else{
				return "Invalid password"
			}
		}
		//return "Login successfully"

		// TODO: Return user object
		return user;

		// faker.js
		//return
	}

	static async update(username, password, phone) {
		// TODO: Check if username exists
		const user = await users.findOne({username: username})

		if(!user){
			return "Invalid username"
		}

		// TODO: Validate password
		//const valid = await bcrypt.compare(password, user.password)

		//if(!valid){
		//	return { status: "invalid password"}
		//}

		else {
			if(user.password==password){
				await users.updateOne(
					{username: username},
					{$set: { phonenumber: phone }}		//{"$set": { phonenumber: phone ,password: password}}
					);
				const userr = await users.findOne({username: username})
				return userr;	
				//return "Update successfully"
			}
			else{
				return "Invalid password"
			}
		}
		//return "Login successfully"

		// TODO: Return user object
		//return a;

		// faker.js
		//return
	}

}

module.exports = User;