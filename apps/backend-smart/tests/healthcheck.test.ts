import { describe, it, expect, vi } from 'vitest';
import server from '../src/server.js';

describe('GET /health', () => {
  it('should return a 200 status and ok message', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/health',
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });
});