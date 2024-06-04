const request = require('supertest');
const app = require('../server'); // Replace with the path to your server file

describe('API Router', () => {
  it('should add a new tech', async () => {
    const response = await request(app)
      .post('/api/techs')
      .send({ name: 'New Tech' });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Tech added');
  });

  it('should add a new site', async () => {
    const response = await request(app)
      .post('/api/sites')
      .send({ name: 'New Site' });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Site added');
  });

  it('should add a new note', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send({ note: 'New Note', job: 'New Job', tech: 'New Tech', timestamp: Date.now() });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Note added');
  });

  // Add more test cases for other API endpoints and error scenarios
});
