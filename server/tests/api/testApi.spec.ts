import request from 'supertest';
import { app } from '../../src';

describe('Test the test path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/test');
    expect(response.statusCode).toBe(200);
  });
  test('It should response the correct response', async () => {
    const response = await request(app).get('/test');
    const wantedResponse = { success: true, message: 'TEST API SUCCESS' };
    expect(response.body).toMatchObject(wantedResponse);
  });
});
