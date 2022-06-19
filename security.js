const bcrypt = require('bcrypt');
let security;

class Security{
    static async injectDB(conn) {
		security = await conn.db("vms-museum").collection("DATABASES")
	}

    /**
	 * @remarks
	 * This method is not implemented yet. To register a new user, you need to call this method.
	 * 
	 * @param {*} username 
	 * @param {*} password 
	 * @param {*} phone 
	 * @param {*} role
	 */

	 static async register(username, password, securityID, role, phone) {
		// TODO: Check if username exists
		const Duplicate = await security.findOne({username:username})

		if(Duplicate){
			return "Duplicate username"
		}

		// TODO: Hash password
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt)

		// TODO: Save user to database
		await security.insertOne({
			username: username,
			password: hashed,
            securityID: securityID,
			role: role,
			phonenumber: phone,
		})
		return "New user registrated"
	}

    static async login(username, password) {
		// TODO: Check if username exists
		const guard = await security.findOne({username: username})

		if(!guard){
			return "Invalid username"
		}

		// TODO: Validate password
		const valid = await bcrypt.compare(password, guard.password)

		if(!valid){
			return "Invalid password"
		}

		// TODO: Return guard
		return guard;
	}

    
}

module.exports = Security;