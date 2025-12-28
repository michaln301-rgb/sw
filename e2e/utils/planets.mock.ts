import { Page } from '@playwright/test';
import { promises as fs } from 'fs';
import * as path from 'path';

type MockPlanetSearchArgs = {
  page: Page;
  planetName: string; 
  payloadFile: string; 
};

export async function mockSwapiPlanetSearch({
  page,
  planetName,
  payloadFile,
}: MockPlanetSearchArgs): Promise<void> {
  // Read payload once (before route runs)
  const filePath = path.isAbsolute(payloadFile)
    ? payloadFile
    : path.resolve(process.cwd(), payloadFile);

  const body = await fs.readFile(filePath, 'utf-8');

  await page.route('https://swapi.tech/api/planets/**', async (route) => {
    const req = route.request();

    if (req.method() !== 'GET') return route.continue();

    const url = new URL(req.url());
    const name = url.searchParams.get('name');

    if (name !== planetName) return route.continue();

    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body,
    });
  });
}
