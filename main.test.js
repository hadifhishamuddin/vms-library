const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {

	let adminaccessToken;
	let securityaccessToken;
	let visitoraccessToken;

	beforeAll(async () => {
		const response1 = await request
			.post('/login/admin')
			.send({username: "raju", password: "plastik666" })
		adminaccessToken=response1.body.token;

		const response2 = await request
			.post('/login/security')
			.send({username: "ah chong", password: "kayu123" })
		securityaccessToken=response2.body.token;

		const response3 = await request
			.post('/login/visitor')
			.send({username: "ali", password: "besi321" })
		visitoraccessToken=response3.body.token;
	});

	// /
	it('should return hello world', async () => {
		return request
			.get('/')
			.expect(200)
			.expect('Content-Type', /text/)
			.then(res => {
				expect(res.text).toBe('Hello World');
			});
		 })

	// /hello
	it('should return hello BENR2423', async () => {
	return request
		.get('/hello')
		.expect(200)
		.expect('Content-Type', /text/)
		.then(res => {
			expect(res.text).toBe('Hello BENR2423');
		});
	 })

	// /register/admin (admin only)
	it('register admin successfully', async () => {
        return request
			.post('/register/admin')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: 'usernameadmin', password: 'correct-password',role: 'admin', phone: 60131212000 })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("New user registrated");
			});
	});

	it('register admin failed, unauthorized', async () => {
		return request
			.post('/register/admin')
			.set('Authorization', `Bearer ${securityaccessToken}`)
			.send({username: 'usernameadmin', password: "correct-password", role: 'admin', phone:60131212000 })
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	// /register/security (admin only)
	it('register security successfully', async () => {
        return request
			.post('/register/security')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: 'usernamesecurity', password: 'correct-password', securityID: 'security 01', role: 'security', phone: 60154446666 })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("New user registrated");
			});
	});

	it('register security failed, unauthorized', async () => {
		return request
			.post('/register/security')
			.set('Authorization', `Bearer ${securityaccessToken}`)
			.send({username: 'usernameadmin', password: "correct-password", securityID: 'security 01', role: 'security', phone:60154446666 })
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	// /register/security (admin only)
	it('register visitor successfully', async () => {
        return request
			.post('/register/visitor')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: 'usernamevisitor', password: 'correct-password', role: 'visitor', phone: 60129994444 })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("New user registrated");
			});
	});

	it('register visitor failed, unauthorized', async () => {
		return request
			.post('/register/security')
			.set('Authorization', `Bearer ${visitoraccessToken}`)
			.send({username: 'usernameadmin', password: "correct-password", role: 'visitor', phone:60129994444 })
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	// /login/admin
	it('login admin failed, wrong password', async () => {
		return request
			.post('/login/admin')
			.send({username: "usernameadmin", password: "wrong-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('login admin failed, wrong username', async () => {
		return request
			.post('/login/admin')
			.send({username: "wrong-username", password: "correct-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('login admin successfully', async () => {
		return request
			.post('/login/admin')
			.send({username: "usernameadmin", password: "correct-password" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(//{
					expect.objectContaining({
						_id: expect.any(String),
						name: expect.any(String),
						phone: expect.any(Number),
						token: expect.any(String)
					})
				);
			});
	});

	// /login/security
	it('login security failed, wrong password', async () => {
		return request
			.post('/login/security')
			.send({username: "usernamesecurity", password: "wrong-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('login security failed, wrong username', async () => {
		return request
			.post('/login/security')
			.send({username: "wrong-username", password: "correct-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('login security successfully', async () => {
		return request
			.post('/login/security')
			.send({username: "usernamesecurity", password: "correct-password" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(//{
					expect.objectContaining({
						_id: expect.any(String),
						name: expect.any(String),
						phone: expect.any(Number),
						token: expect.any(String)
					})
				);
			});
	});

	// /login/visitor
	it('login visitor failed, wrong password', async () => {
		return request
			.post('/login/visitor')
			.send({username: "usernamevisitor", password: "wrong-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('login visitor failed, wrong username', async () => {
		return request
			.post('/login/visitor')
			.send({username: "wrong-username", password: "correct-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('login visitor successfully', async () => {
		return request
			.post('/login/visitor')
			.send({username: "usernamevisitor", password: "correct-password" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(//{
					expect.objectContaining({
						_id: expect.any(String),
						name: expect.any(String),
						phone: expect.any(Number),
						token: expect.any(String)
					})
				);
			});
	});

	// /update phonenumber & password (admin update)
	it('update admin failed, unauthorized', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${visitoraccessToken}`)
			.send({username: "usernameadmin", password: "correct-password", newphone: 60199898000, newpassword: "new-password"})
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	it('update admin failed, wrong password', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernameadmin", password: "wrong-password",  newphone: 60199898000, newpassword: "new-password"})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('update admin failed, wrong username', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "wrong-username", password: "correct-password",  newphone: 60199898000, newpassword: "new-password"})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('update admin successfully', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernameadmin", password: "correct-password", newphone: 60199898000, newpassword: "new-password"})
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						username: expect.any(String),
						password: expect.any(String),
						phone: expect.any(Number),
					})
				);
			});
	})

	// /update phonenumber & password (security update)
	it('update security failed, unauthorized', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${visitoraccessToken}`)
			.send({username: "usernamesecurity", password: "correct-password", newphone: 60108887777, newpassword: "new-password"})
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	it('update security failed, wrong password', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${securityaccessToken}`)
			.send({username: "usernamesecurity", password: "wrong-password", newphone: 60108887777, newpassword: "new-password"})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('update security failed, wrong username', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${securityaccessToken}`)
			.send({username: "wrong-username", password: "correct-password", newphone: 60108887777, newpassword: "new-password"})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('update security successfully', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${securityaccessToken}`)
			.send({username: "usernamesecurity", password: "correct-password", newphone: 60108887777, newpassword: "new-password"})
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						username: expect.any(String),
						password: expect.any(String),
						phone: expect.any(Number),
					})
				);
			});
	})

	// /update phonenumber & password (visitor update)
	it('update visitor failed, unauthorized', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${visitoraccessToken}`)
			.send({username: "usernamevisitor", password: "correct-password", newphone: 60112342345, newpassword: "new-password"})
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	it('update visitor failed, wrong password', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernamevisitor", password: "wrong-password", newphone: 60112342345, newpassword: "new-password"})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('update visitor failed, wrong username', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "wrong-username", password: "correct-password", newphone: 60112342345, newpassword: "new-password"})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('update visitor successfully', async () => {
		return request
			.patch('/update')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernamevisitor", password: "correct-password", newphone: 60112342345, newpassword: "new-password"})
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						username: expect.any(String),
						password: expect.any(String),
						phone: expect.any(Number),
					})
				);
			});
	})

	// /update/visitor/booking (admin only)
	it('update book reservation failed, unauthorized', async () => {
		return request
			.patch('/update/visitor/booking')
			.set('Authorization', `Bearer ${securityaccessToken}`)
			.send({username: "usernamevisitor", password: "new-password", books: "Hensen and Gretel ", borrowdate: "30/1/2022", returndate: "30/2/2022"})
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	it('update book reservation failed, wrong password', async () => {
		return request
			.patch('/update/visitor/booking')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernamevisitor", password: "wrong-password", books: "Hensen and Gretel ", borrowdate: "30/1/2022", returndate: "30/2/2022"})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('update book reservation failed, wrong username', async () => {
		return request
			.patch('/update/visitor/booking')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "wrong-username", password: "new-password", books: "Hensen and Gretel ", borrowdate: "30/1/2022", returndate: "30/2/2022"})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('update book reservation successfully', async () => {
		return request
			.patch('/update/visitor/booking')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernamevisitor", password: "new-password", books: "Hensen and Gretel ", borrowdate: "30/1/2022", returndate: "30/2/2022"})
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						username: expect.any(String),
						book: expect.any(String),
						borrowdate: expect.any(String),
						returndate: expect.any(String)
					})
				);
			});
	})
	
	// /update/visitor/returning (admin only)
	it('update book returning failed, unauthorized', async () => {
		return request
			.patch('/update/visitor/returning')
			.set('Authorization', `Bearer ${visitoraccessToken}`)
			.send({username: "usernamevisitor", password: "new-password", books: "Hensen and Gretel "})
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	it('update book returning failed, wrong password', async () => {
		return request
			.patch('/update/visitor/returning')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernamevisitor", password: "wrong-password", books: "Hensen and Gretel "})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('update book returning failed, wrong username', async () => {
		return request
			.patch('/update/visitor/returning')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "wrong-username", password: "new-password", books: "Hensen and Gretel "})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('update book returning successfully', async () => {
		return request
			.patch('/update/visitor/returning')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernamevisitor", password: "new-password", books: "Hensen and Gretel "})
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						username: expect.any(String),
						book: expect.any(String),
						borrowdate: expect.any(String),
						returndate: expect.any(String),
					})
				);
			});
	})

	// /visitor/view
	it('view visitor failed, wrong username', async () => {
		return request
			.post('/visitor/view')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "wrong-username"})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('view visitor failed, unauthorized (no token)', async () => {
		return request
			.post('/visitor/view')
			.send({username: "usernamevisitor"})
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	it('view visitor successfully', async () => {
		return request
			.post('/visitor/view')
			.set('Authorization', `Bearer ${visitoraccessToken}`)
			.send({username: "usernamevisitor"})
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						username: expect.any(String),
						book: expect.any(String),
						borrowdate: expect.any(String),
						returndate: expect.any(String)
					})
				);
			});
	})

	// /delete (visitor)
	it('delete visitor failed, unauthorized', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${visitoraccessToken}`)
			.send({username: "usernamevisitor", password: "new-password" })
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	it('delete visitor failed, wrong username', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "wrong-username", password: "new-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('delete visitor failed, wrong password', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernamevisitor", password: "wrong-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('delete visitor successfully', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernamevisitor", password: "new-password" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Delete successfully");
			});
	})

	// /delete (security)
	it('delete security failed, unauthorized', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${securityaccessToken}`)
			.send({username: "usernamesecurity", password: "new-password" })
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	it('delete security failed, wrong username', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "wrong-username", password: "new-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('delete security failed, wrong password', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernamesecurity", password: "wrong-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('delete security successfully', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernamesecurity", password: "new-password" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Delete successfully");
			});
	})

	// /delete (admin)
	it('delete admin failed, unauthorized', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${securityaccessToken}`)
			.send({username: "usernameadmin", password: "new-password" })
			.expect('Content-Type', /text/)
			.expect(403).then(response => {
				expect(response.text).toEqual("Unauthorized");
			});
	})

	it('delete admin failed, wrong username', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "wrong-username", password: "new-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('delete admin failed, wrong password', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernameadmin", password: "wrong-password" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('delete admin successfully', async () => {
		return request
			.delete('/delete')
			.set('Authorization', `Bearer ${adminaccessToken}`)
			.send({username: "usernameadmin", password: "new-password" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Delete successfully");
			});
	})

});

