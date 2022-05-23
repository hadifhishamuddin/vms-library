const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {
	it('should return hello world', async () => {
	return request.get('/hello')
		.expect(200)
		.expect('Content-Type', /text/)
		.then(res => {
		expect(res.text).toBe('Hello BENR2423');
		});
	 })

	it('register successfully', async () => {
        return request
			.post('/register')
			.send({'username': 'khair', 'password': '44dd', 'phone': '0131212000' })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("New user registrated");
			});
	});

	it('register failed', async () => {
		return request
			.post('/register')
			.send({'username': 'khair', 'password': "55ee", 'phone':'0154446666' })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Duplicate username");
			});
	})

	// it('login successfully', async () => {
	// 	return request
	// 		.post('/login')
	// 		.send({'username': "khair", 'password': "44dd" })
	// 		.expect('Content-Type', /text/)
	// 		.expect(200).then(response => {
	// 			expect(response.text).toEqual("login successful!");
	// 		});
	// });

	it('login successfully', async () => {
		return request
			.post('/login')
			.send({'username': "khair", 'password': "44dd" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				//expect(response.text).toEqual("login successful!");
				expect(response.body).toEqual(//{
					expect.objectContaining({
						//_id: "627e0ff26fbe85100655686a",
						// username: "farhan",
						// phone: "0154446666",
						//_id: expect.any(String),
						name: "khair",	//expect.any(String)
						phone: "0131212000",		//expect.any(Number)
					})
				//}
				);
					
				// expect(response.text).toEqual("Update successfully");
			});
		
	});

	it('login failed, wrong password', async () => {
		return request
			.post('/login')
			.send({'username': "khair", 'password': "44de" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('login failed, wrong username', async () => {
		return request
			.post('/login')
			.send({'username': "khaii", 'password': "44dd" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('update failed, wrong password', async () => {
		return request
			.patch('/update/user')
			.send({'username': "khair", 'password': "44de", 'phone':'0154446666' })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('update failed, wrong username', async () => {
		return request
			.patch('/update/user')
			.send({'username': "khaii", 'password': "44dd", 'phone':'0154446666' })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('update successfully', async () => {
		return request
			.patch('/update/user')
			.send({username: "farhan", password: "33cc", phone:'0154446666' })
			.expect('Content-Type', /json/)		//'application/json; charset=utf-8'
			.expect(200).then(response => {
				expect(response.body).toEqual(//{
					expect.objectContaining({
						_id: "627e0ff26fbe85100655686a",
						username: "farhan",
						phone: "0154446666",
						// _id: expect.any(String),
						// username: expect.any(String),
						// phone: expect.any(Number),
					})
				//}
				);
				
				// expect(response.text).toEqual("Update successfully");
			});
	})

	// it('update successfully', async () => {
	// 	return request
	// 		.post('/update/user')
	// 		.send({username: "farhan", password: "33cc", phone:'0154446666'})
	// 		.expect('Content-Type', /json/)
	// 		.expect(200).then(response => {
	// 			expect(response.body).toEqual(
	// 				expect.objectContaining({
	// 					_id: expect.any(String),
	// 					name: expect.any(String),
	// 					phonenumber: expect.any(Number),
	// 				})
	// 			);
	// 		});
	// });

	it('delete failed, wrong username', async () => {
		return request
			.delete('/delete/user')
			.send({'username': "khaii", 'password': "44dd" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid username");
			});
	})

	it('delete failed, wrong password', async () => {
		return request
			.delete('/delete/user')
			.send({'username': "khair", 'password': "44de" })
			.expect('Content-Type', /text/)
			.expect(401).then(response => {
				expect(response.text).toEqual("Invalid password");
			});
	})

	it('delete successfully', async () => {
		return request
			.delete('/delete/user')
			.send({'username': "khair", 'password': "44dd" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("Delete successfully");
			});
	})
});