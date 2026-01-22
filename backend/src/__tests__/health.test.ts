import request from 'supertest';
import app from '../index';

describe('Health Check', () => {
  it('should return status ok', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });
});
