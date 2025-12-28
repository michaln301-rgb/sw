import { test, expect } from '@playwright/test';
import { searchByName } from '../../api/search';
import { expectSuccessfulSearchResponse } from '../../api/common.assert';

test('@SMOKE @API GET person Luke Skywalker', async ({ request }) => {
  let status: number;
  let body: any;

  await test.step('Search person by name', async () => {
    ({ status, body } = await searchByName(request, 'people', 'Luke Skywalker'));
  });

  await test.step('Validate common response', async () => {
    expectSuccessfulSearchResponse(status, body);
  });

  await test.step('Validate person data', async () => {
    const person = body.result[0].properties;

    expect(person.name).toBe('Luke Skywalker');
    expect(person.gender).toBe('male');
    expect(person.birth_year).toBe('19BBY');
    expect(person.height).toBe('172');
    expect(person.mass).toBe('77');
    expect(person.url).toContain('/people/');
  });
});
