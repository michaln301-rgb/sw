import type { APIRequestContext } from '@playwright/test';
import { swapiRoutes, type SwapiResource } from './swapi.routes';

export async function searchByName(
  request: APIRequestContext,
  resource: SwapiResource,
  name: string,
) {
  const url = `${swapiRoutes.baseURL}${swapiRoutes.resources[resource]}/`;

  const response = await request.get(url, { params: { name } });

  const contentType = response.headers()['content-type'] ?? '';
  const text = await response.text();

  if (!contentType.includes('application/json')) {
    throw new Error(
      `Expected JSON but got "${contentType}". URL="${response.url()}". First chars="${text.slice(0, 80)}"`,
    );
  }

  return {
    status: response.status(),
    body: JSON.parse(text),
  };
}
