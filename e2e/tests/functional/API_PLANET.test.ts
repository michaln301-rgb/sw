import { test, expect } from '@playwright/test';
import { searchByName } from '../../api/search';
import { expectSuccessfulSearchResponse } from '../../api/common.assert';

test('@SMOKE @API GET planet Polis Massa', async ({ request }) => {
  let status: number;
  let body: any;

  await test.step('Search planet by name', async () => {
    ({ status, body } = await searchByName(request, 'planets', 'Polis Massa'));
  });

  await test.step('Validate common response', async () => {
    expectSuccessfulSearchResponse(status, body);
  });

  await test.step('Validate planet data', async () => {
    const planet = body.result[0].properties;
    expect(planet.name).toBe('Polis Massa');
    expect(planet.terrain).toBe('airless asteroid');
    expect(planet.climate.trim()).toBe('artificial temperate');
    expect(planet.gravity).toBe('0.56 standard');
    expect(planet.population).toBe('1000000');
    expect(planet.url).toContain('/planets/15');
  });
});
