import { expect } from '@playwright/test';

export function expectSuccessfulSearchResponse(
  status: number,
  body: any
) {
  expect(status).toBe(200);
  expect(body).toBeTruthy();
  expect(body.message).toBe('ok');
  expect(Array.isArray(body.result)).toBe(true);
  expect(body.result.length).toBeGreaterThan(0);
}
