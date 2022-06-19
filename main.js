const MongoClient = require("mongodb").MongoClient;
const User = require("./user");
const Visitor = require("./visitor");
const Security = require("./security");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@Sandbox.mktdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
	Visitor.injectDB(client);
	Security.injectDB(client);
})

const express = require('express')
const app = express()
const port = process.env.PORT || 3000


const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'MyVMS API',
			version: '1.0.0',
		},
	},
	apis: ['./main.js'], // files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome!
 *     responses:
 *       200:
 *         description: Returns Hello World.
 */

// app.get('/', (req, res) => {
// 	res.send('Hello World')
// })

/**
 * @openapi
 * /hello:
 *   get:
 *     description: greetings
 *     responses:
 *       200:
 *         description: Returns Hello BENR2423.
 */

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})


/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *         name: 
 *           type: string
 *         phone: 
 *           type: number
 *         token:
 *           type: string
 *     register:
 *       type: object
 *       properties:
 *         username: 
 *           type: string
 *         password: 
 *           type: string
 *         role: 
 *           type: string
 *         phone:
 *           type: number
 *     variable:
 *       type: object
 *       properties:
 *         username: 
 *           type: string
 *         password: 
 *           type: string
 *     update:
 *       type: object
 *       properties:
 *         username: 
 *           type: string
 *         password: 
 *           type: string
 *         newphone: 
 *           type: number
 *         newpassword:
 *           type: string
 *     booking:
 *       type: object
 *       properties:
 *         username: 
 *           type: string
 *         password: 
 *           type: string
 *         books: 
 *           type: string
 *         borrowdate:
 *           type: string
 *         returndate:
 *           type: string
 *     returning:
 *       type: object
 *       properties:
 *         username: 
 *           type: string
 *         password: 
 *           type: string
 *         books: 
 *           type: string
 *     respond:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *         username: 
 *           type: string
 *         book: 
 *           type: string
 *         borrowdate:
 *           type: string
 *         returndate:
 *           type: string
 *     view:
 *       type: object
 *       properties:
 *         username: 
 *           type: string
 *         book: 
 *           type: string
 *         borrowdate:
 *           type: string
 *         returndate:
 *           type: string
 *
 */

/**
 * @swagger
 * /login/admin:
 *   post:
 *     description: Admin Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       401:
 *         description: Invalid username or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       
 */

//login admin
app.post('/login/admin', async (req, res) => {
	console.log(req.body);

	const user = await User.login(req.body.username, req.body.password);

	if (user == 'Invalid username'){
		res.status(401).send("Invalid username")
		return
	}

	else if (user == 'Invalid password'){
		res.status(401).send("Invalid password")
		return
	}
	res.status(200).json({
		_id: user._id,
		name: user.username,
		phone: user.phonenumber,
		token: generateAccessToken({ 
			username: user.username,
			role: user.role
		})
	})
})

/**
 * @swagger
 * /login/security:
 *   post:
 *     description: Security Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/variable'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       401:
 *         description: Invalid username or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       
 */

//login security
app.post('/login/security', async (req, res) => {
	console.log(req.body);

	const security = await Security.login(req.body.username, req.body.password);

	if (security == 'Invalid username'){
		res.status(401).send("Invalid username")
		return
	}

	else if (security == 'Invalid password'){
		res.status(401).send("Invalid password")
		return
	}
	res.status(200).json({
		_id: security._id,
		name: security.username,
		phone: security.phonenumber,
		token: generateAccessToken({ 
			username: security.username,
			role: security.role
		})
	})
})

/**
 * @swagger
 * /login/visitor:
 *   post:
 *     description: Visitor Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/variable'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       401:
 *         description: Invalid username or password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       
 */

//login visitor
app.post('/login/visitor', async (req, res) => {
	console.log(req.body);

	const visitor = await Visitor.login(req.body.username, req.body.password);

	if (visitor == 'Invalid username'){
		res.status(401).send("Invalid username")
		return
	}

	else if (visitor == 'Invalid password'){
		res.status(401).send("Invalid password")
		return
	}
	res.status(200).json({
		_id: visitor._id,
		name: visitor.username,
		phone: visitor.phonenumber,
		token: generateAccessToken({ 
			username: visitor.username,
			role: visitor.role
		})
	})
})

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /register/admin:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     description: register Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/register'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       401:
 *         description: Duplicate username
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       403:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       
 */

//admin register new document another admin
app.post('/register/admin',verifyToken, async (req, res) => {
	console.log(req.user);
	if(req.user.role=='admin'){
		let user = await User.register(req.body.username, req.body.password,req.body.role, req.body.phone);
	
		if (user == 'Duplicate username'){
			res.status(401).send("Duplicate username")
			return
		}

		res.status(200).send("New user registrated")
		return
	}
	else{
		res.status(403).send('Unauthorized')
	}	
})

/**
 * @swagger
 * /register/security:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     description: register Security
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password: 
 *                 type: string
 *               securityID: 
 *                 type: string
 *               role: 
 *                 type: string
 *               phone: 
 *                 type: number
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       401:
 *         description: Duplicate username
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       403:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       
 */

//admin register new document security
app.post('/register/security',verifyToken, async (req, res) => {
	console.log(req.user);
	if(req.user.role=='admin'){
		let security = await Security.register(req.body.username, req.body.password, req.body.securityID, req.body.role, req.body.phone);
	
		if (security == 'Duplicate username'){
			res.status(401).send("Duplicate username")
			return
		}

		res.status(200).send("New user registrated")
		return
	}
	else{
		res.status(403).send('Unauthorized')
	}	
})

/**
 * @swagger
 * /register/visitor:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     description: register Visitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/register'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       401:
 *         description: Duplicate username
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       403:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       
 */

//admin register new document visitor
app.post('/register/visitor',verifyToken, async (req, res) => {
	console.log(req.user);
	if(req.user.role=='admin'){
		let visitor = await Visitor.register(req.body.username, req.body.password,req.body.role, req.body.phone);
	
		if (visitor == 'Duplicate username'){
			res.status(401).send("Duplicate username")
			return
		}

		res.status(200).send("New user registrated")
		return
	}
	else{
		res.status(403).send('Unauthorized')
	}	
})

/**
 * @swagger
 * /update:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     description: update phone number & password (admin/security/visitor)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/update'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 _id: 
 *                   type: string
 *                 username: 
 *                   type: string
 *                 password: 
 *                   type: string
 *                 phone: 
 *                   type: number
 *       401:
 *         description: Invalid username or Invalid password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       403:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       
 */

//update phonenumber & password
app.patch('/update', verifyToken, async (req,res) =>{
	console.log(req.user);

	if(req.user.role=='admin'||req.user.role=='security'){
		let user = await User.update(req.body.username, req.body.password, req.body.newphone, req.body.newpassword);
		if (user == 'Invalid username'){
			res.status(401).send("Invalid username")
			return
		}

		else if (user == 'Invalid password'){
			res.status(401).send("Invalid password")
			return
		}

		res.status(200).json({
			_id: user._id,
			username: user.username,
			password: user.password,
			phone: user.phonenumber,
		});
	}
	else{
		res.status(403).send('Unauthorized')
	}
	
})

/**
 * @swagger
 * /update/visitor/booking:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     description: update visitor book reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/booking'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/respond'
 *       401:
 *         description: Invalid username or Invalid password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       403:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       
 */

//visitor booking
app.patch('/update/visitor/booking', verifyToken, async (req,res) =>{
	console.log(req.user);

	if(req.user.role=='admin'){
		let visitor = await Visitor.booking(req.body.username, req.body.password, req.body.books, req.body.borrowdate, req.body.returndate);
		if (visitor == 'Invalid username'){
			res.status(401).send("Invalid username")
			return
		}

		else if (visitor == 'Invalid password'){
			res.status(401).send("Invalid password")
			return
		}

		res.status(200).json({
			_id: visitor._id,
			username: visitor.username,
			book: visitor.book,
			borrowdate: visitor.borrowdate,
			returndate: visitor.returndate,
		});
	}
	else{
		res.status(403).send('Unauthorized')
	}
	
})

/**
 * @swagger
 * /update/visitor/returning:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     description: update visitor book returning
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/returning'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/respond'
 *       401:
 *         description: Invalid username or Invalid password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       403:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       
 */

//visitor returning
app.patch('/update/visitor/returning', verifyToken, async (req,res) =>{
	console.log(req.user);

	if(req.user.role=='admin'){
		let visitor = await Visitor.returning(req.body.username, req.body.password, req.body.books);
		if (visitor == 'Invalid username'){
			res.status(401).send("Invalid username")
			return
		}

		else if (visitor == 'Invalid password'){
			res.status(401).send("Invalid password")
			return
		}

		res.status(200).json({
			_id: visitor._id,
			username: visitor.username,
			book: visitor.book,
			borrowdate: visitor.borrowdate,
			returndate: visitor.returndate
		});
	}
	else{
		res.status(403).send('Unauthorized')
	}
	
})

/**
 * @swagger
 * /visitor/view:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: find visitor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: 
 *                 type: string 
 *             
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/view'
 *       401:
 *         description: Invalid username or Invalid password or Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *
 */

//view visitor
app.get('/visitor/view',verifyToken, async (req, res) => {
	console.log(req.user);

	if(req.user.role=='admin'||req.user.role=='security'||req.user.role=='visitor'){
		let visitor = await Visitor.findVisitor(req.body.username);
		if (visitor == 'Invalid username'){
			res.status(401).send("Invalid username")
			return
		}

		res.status(200).json({
			username: visitor.username,
			book: visitor.book,
			borrowdate: visitor.borrowdate,
			returndate: visitor.returndate
		});
	}
	else{
		res.status(401).send('Unauthorized')
	}
})

/**
 * @swagger
 * /delete:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     description: delete (admin/security/visitor)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/variable'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       401:
 *         description: Invalid username or Invalid password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       403:
 *         description: Unauthorized
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

//delete admin/security/visitor
app.delete('/delete', verifyToken, async (req,res) =>{
	console.log(req.user);

	if(req.user.role=='admin'){
		let user = await User.delete(req.body.username, req.body.password);
		if (user == 'Invalid username'){
			res.status(401).send("Invalid username")
			return
		}

		else if (user == 'Invalid password'){
			res.status(401).send("Invalid password")
			return
		}

		res.status(200).send("Delete successfully")
	}
	else{
		res.status(403).send('Unauthorized')
	}
	
})

app.listen(port, () => {
	console.log(`Example App listening on port ${port}`)
})

const jwt = require('jsonwebtoken');

function generateAccessToken(payload) {
  return jwt.sign(payload, "my-super-secret", {expiresIn: '1h'});
}

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, "my-super-secret", (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user
    
    next()
  })
}