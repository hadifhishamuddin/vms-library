const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@Sandbox.mktdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	//"mongodb://m001-student:m001-mongodb-basics@sandbox-shard-00-00.mktdo.mongodb.net:27017,sandbox-shard-00-01.mktdo.mongodb.net:27017,sandbox-shard-00-02.mktdo.mongodb.net:27017/week7?ssl=true&authSource=admin&replicaSet=authSource=admin&replicaSet=atlas-rb1dpd-shard-0&retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
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

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})


// app.post('/login', async (req, res) => {
// 	console.log(req.body);

// 	let user = await User.login(req.body.username, req.body.password);

// 	if (user.status == 'invalid username') {
// 		res.status(401).send("Invalid username or password");
// 		return
// 	}
	
// 	res.status(200).json({
// 		_id: user._id,
// 		username: user.username,
// 		phone: user.phone,
// 	});
// })

// app.post('/register', async (req, res) => {
// 	console.log(req.body);

// })


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *         username: 
 *           type: string
 *         phone: 
 *           type: string
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: User Login
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
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid username or password
 */



app.post('/login', async (req, res) => {
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
	//res.status(200).send("login successful!")
	res.status(200).json({
		//_id: user._id,
		name: user.username,
		phone: user.phonenumber,
	})
})

app.post('/register', async (req, res) => {
	console.log(req.body);

	let user = await User.register(req.body.username, req.body.password, req.body.phone);
	if (user == 'Duplicate username'){
		res.status(401).send("Duplicate username")
		return
	}

	res.status(200).send("New user registrated")
	return
	// res.json({
	// 	_id: '123456',
	// 	name: 'test',
	// 	age: 18,
	// })
})

app.patch('/update/user',async (req,res) =>{
	console.log(req.body);

	let user = await User.update(req.body.username, req.body.password, req.body.phone);
	if (user == 'Invalid username'){
		res.status(401).send("Invalid username")
		return
	}

	else if (user == 'Invalid password'){
		res.status(401).send("Invalid password")
		return
	}

	//res.status(200).send("Update successfully")
	//return
	res.status(200).json({
		_id: user._id,
		username: user.username,
		phone: user.phonenumber,
		//user
	});
	//return res.status(200).json(user)
})

app.delete('/delete/user',async (req,res) =>{
	console.log(req.body);

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
	//res.status(200).json({
	//	_id: user._id,
	//	name: user.username,
	//	phonenumber: user.phone,
	//})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})


