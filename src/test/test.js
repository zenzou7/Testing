const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

const generatePost = () => {
  return {
    name: faker.commerce.product(),
    id: faker.random.numeric(),
    price: faker.commerce.price(1, 1000, 2, ''),
    thumbnail: faker.image.food(640, 480, true),
  };
};

describe('test posts endpoint', () => {
  //GET
  describe('GET ALL', () => {
    it('deberia responder con status 200 y ser array', async () => {
      const res = await request.get('/api/productos');
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('array');
      //   expect(res.body).to.eql({ version: '0.0.1' });
    });
  });
  //POST
  describe('POST ONE', () => {
    it('deberia incorporar un posteo', async () => {
      const post = generatePost();

      const res = await request.post('/api/productos/form').send(post);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('msg');
      expect(post.body).to.eql(res.body.body);
    });
  });
});
