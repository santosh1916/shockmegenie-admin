import { describe, expect, it } from 'vitest';
import { ApiRequestError } from './client';

describe('ApiRequestError', () => {
  it('carries the status and error code so callers can branch on them', () => {
    const error = new ApiRequestError(409, 'ORDER_ALREADY_PACKED', 'Too late to cancel');

    expect(error.status).toBe(409);
    expect(error.code).toBe('ORDER_ALREADY_PACKED');
    expect(error.message).toBe('Too late to cancel');
    expect(error).toBeInstanceOf(Error);
  });
});
