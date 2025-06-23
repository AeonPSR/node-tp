require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Clean up existing test user if needed (optional)
  await request(app).post('/auth/register').send({
    username: 'testuser',
    password: 'testpass'
  });

  const res = await request(app).post('/auth/login').send({
    username: 'testuser',
    password: 'testpass'
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /articles', () => {
  it('should return 200 and a list of articles', async () => {
    const res = await request(app).get('/articles');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /articles', () => {
  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${token}`) // ✅ Add token
      .send({ title: 'Missing tags and author' }); // invalid payload

    expect(res.statusCode).toBe(400);
    expect(res.body.error || res.text).toBeDefined();
  });
});
