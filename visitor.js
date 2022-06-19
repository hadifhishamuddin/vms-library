const bcrypt = require('bcrypt');
let visitors;

class Visitor{
    static async injectDB(conn) {
		visitors = await conn.db("vms-museum").collection("DATABASES")
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

	static async register(username, password, role, phone) {
		// TODO: Check if username exists
		const Duplicate = await visitors.findOne({username:username})

		if(Duplicate){
			return "Duplicate username"
		}

		// TODO: Hash password
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt)

		// TODO: Save user to database
		await visitors.insertOne({
			username: username,
			password: hashed,
			role: role,
			phonenumber: phone,
		})
		return "New user registrated"
	}

	static async login(username, password) {
		// TODO: Check if username exists
		const guest = await visitors.findOne({username: username})

		if(!guest){
			return "Invalid username"
		}

		// TODO: Validate password
		const valid = await bcrypt.compare(password, guest.password)

		if(!valid){
			return "Invalid password"
		}

		// TODO: Return user object
		return guest;
	}

    static async booking(username, password, books, borrowdate, returndate){
		// TODO: Check if username exists
		const guest = await visitors.findOne({username: username})

		if(!guest){
			return "Invalid username"
		}

		// TODO: Validate password
		const valid = await bcrypt.compare(password, guest.password)

		if(!valid){
			return "Invalid password"
		}

		// TODO: Update books from database
		await visitors.updateOne(
			{username: username},
			{$set: { 
				book: books,
				borrowdate: borrowdate,
				returndate: returndate
			}}
			);
		
		// TODO: Return userr object
		const guestt = await visitors.findOne({username: username})
		return guestt;
	}

	static async returning(username, password, books){
		// TODO: Check if username exists
		const guest = await visitors.findOne({username: username})

		if(!guest){
			return "Invalid username"
		}

		// TODO: Validate password
		const valid = await bcrypt.compare(password, guest.password)

		if(!valid){
			return "Invalid password"
		}

		if(books!=guest.book){
			return "Invalid book"
		}
		// TODO: Update books from database
		await visitors.updateOne(
			{username: username},
			{$set: { 
				book: '',
				borrowdate: '',
				returndate: ''
			}}
			);
		
		// TODO: Return userr object
		const guestt = await visitors.findOne({username: username})
		return guestt;
	}

    static async findVisitor(username) {
	    //return await visitors.findOne({username : username})
		const guest = await visitors.findOne({username: username})

		if(!guest){
			return "Invalid username"
		}
		return guest;
	}
}

module.exports = Visitor;