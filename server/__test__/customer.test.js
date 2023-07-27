const app = require("../app");
const request = require("supertest");
const { Sequelize } = require("../models");
const {generateToken} = require("../helper/jwt")
jest.setTimeout(2000);


describe("Customer Controller Test", () => {
  test('register success', async () => {
    const response = await request(app).post("/pub/register").send({
      email : "z@z.com",
      password : "123123",
    })
    expect(response.status).toBe(201)
  })

  test('register empty email', async () => {
    const response = await request(app).post("/pub/register").send({
      email : "",
      password : "123123",
    })
    expect(response.status).toBe(400)
  })

  test('register password empty', async () => {
    const response = await request(app).post("/pub/register").send({
      email : "z@zz.com",
      password : "",
    })
    expect(response.status).toBe(400)
  })

  test('register email space', async () => {
    const response = await request(app).post("/pub/register").send({
      email : " ",
      password : "123123",
    })
    expect(response.status).toBe(400)
  })

  test('register password space', async () => {
    const response = await request(app).post("/pub/register").send({
      email : "z@zzz.com",
      password : " ",
    })
    expect(response.status).toBe(400)
  })

  test('register email should be Unique', async () => {
    const response = await request(app).post("/pub/register").send({
      email : "z@z.com",
      password : "123123",
    })
    expect(response.status).toBe(400)
  })

  test('register invalid email format', async () => {
    const response = await request(app).post("/pub/register").send({
      email : "z",
      password : "123123",
    })
    expect(response.status).toBe(400)
  })

  test('Login Success', async () => {
    const response = await request(app).post("/pub/login").send({
      email : "z@z.com",
      password : "123123",
    })
    expect(response.status).toBe(200)
  })

  test('Login invalid password', async () => {
    const response = await request(app).post("/pub/login").send({
      email : "z@z.com",
      password : "12312",
    })
    expect(response.status).toBe(401)
  })

  test('Login invalid email', async () => {
    const response = await request(app).post("/pub/login").send({
      email : "z@domain.com",
      password : "123123",
    })
    expect(response.status).toBe(401)
  })

  test('get all Cuisine Success', async () => {
    const response = await request(app).get("/pub/cuisines");
    expect(response.status).toBe(200)
  })

  test('get  Cuisine Success', async () => {
    const response = await request(app).get("/pub/cuisines/?page=1&pageLimit=5");
    expect(response.status).toBe(200)
  })

  test('get different page Cuisine Success', async () => {
    const response = await request(app).get("/pub/cuisines/?page=2&pageLimit=5");
    expect(response.status).toBe(200)
  })

  test('get filtered and  Cuisine Success', async () => {
    const response = await request(app).get("/pub/cuisines/?page=1&pageLimit=5&search=wine");
    expect(response.status).toBe(200)
  })

  test('get one Cuisine Success', async () => {
    const id = 1;
    const response = await request(app).get(`/pub/cuisines/${id}`);
    expect(response.status).toBe(200);
  });
  
  test('get one Cuisine failed', async () => {
    const id = 40;
    const response = await request(app).get(`/pub/cuisines/${id}`);
    expect(response.status).toBe(404);
  });

  test('get favorites Success', async () => {
    const id = 1;
    const token = generateToken({ id: id });
    const response = await request(app).get('/pub/favorites').set('access_token', token);
    
    expect(response.status).toBe(200);
  });

  test('post new favorites to logged user Success', async () => {
    const id = 1;
    const cuisineId = 1;
    const token = generateToken({ id: id }); 
    const response = await request(app)
      .post(`/pub/favorites`) // Updated route here
      .send({ CuisineId: cuisineId }) // Send cuisineId in the request body
      .set('access_token', token);
    expect(response.status).toBe(201);
  });
  
  test('post new favorites to logged user failed', async () => {
    const id = 1;
    const CuisineId = 30;
    const token = generateToken({ id: id }); 
    const response = await request(app)
      .post(`/pub/favorites`)
      .send({ CuisineId: CuisineId }) // Send CuisineId in the request body as an object
      .set('access_token', token);
    expect(response.status).toBe(404);
  });

  test('post new favorites to logged user but no token', async () => {
    const id = 1;
    const CuisineId = 1;
    const token = generateToken({ id: id }); 
    const response = await request(app)
      .post(`/pub/favorites`) // Updated route here
      .send({ CuisineId: CuisineId }) // Send CuisineId in the request body as an object
    expect(response.status).toBe(401);
  });
  
  test('post new favorites to logged token random string', async () => {
    const id = 1;
    const cuisineId = 1; // Updated variable name here
    const token = "dbsgasg";
    const response = await request(app)
      .post(`/pub/favorites`) // Updated route here
      .send({ CuisineId: cuisineId }) // Send cuisineId in the request body as an object
      .set('access_token', token);
    expect(response.status).toBe(401);
  });
  
})