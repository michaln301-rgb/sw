import test from '../../lib/BaseTest';
import { mockSwapiPlanetSearch } from '../../utils/planets.mock';

test.beforeEach(async ({ searchPage }) => {
  await mockSwapiPlanetSearch({
    page: searchPage.page,
    planetName: 'Polis Massa',
    payloadFile: 'e2e/payloads/planets/polis-massa.json',
  });

  await searchPage.navigateToURL();
});

test(`@SMOKE @MOCKED Validate search for valid planet Polis Massa`, async ({ searchPage }) => {
  await test.step(`Search for planet`, async () => {
    await searchPage.searchPlanetsInput('Polis Massa');
  });

  await test.step(`Validate planet results`, async () => {
    await test.expect(searchPage.page.getByText('Loading...', { exact: true })).toBeHidden();
    await test
      .expect(searchPage.CARD_SUBTITLE.filter({ hasText: 'Polis Massa MOCKED' }).first())
      .toBeVisible();
  });
});
