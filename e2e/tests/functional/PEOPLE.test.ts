import { expect } from 'playwright/test';
import test from '../../lib/BaseTest';

test.beforeEach(async ({ searchPage }) => {
  await searchPage.navigateToURL();
});

type PersonTestData = {
  name: string;
  rows: Record<string, string>;
};

const PEOPLE: PersonTestData[] = [
  {
    name: 'Luke Skywalker',
    rows: {
      'Gender:': 'male',
      'Birth year:': '19BBY',
      'Eye color:': 'blue',
      'Skin color:': 'fair',
      //Uncomment once added to ui
      // 'Height:': '150',
      // 'Mass:': '49',
      // 'Films:': '4',
      // 'Vehicles:': '1',
      // 'Starships:': '0',
    },
  },
  {
    name: 'Leia Organa',
    rows: {
      'Gender:': 'female',
      'Birth year:': '19BBY',
      'Eye color:': 'brown',
      'Skin color:': 'light',
    },
  },
];

for (const person of PEOPLE) {
  test(`@SMOKE Validate search for ${person.name}`, async ({ searchPage }) => {
    await test.step('Search for unique people', async () => {
      await searchPage.searchPeopleInput(person.name);
    });

    await test.step('Validate search results', async () => {
      const card = searchPage.peopleInformationCard(person.name);

      await card.expectTitle(person.name);
      await card.expectRows(person.rows);
    });
  });
}

const INVALID_SEARCH_INPUTS = [
  'Luke Skywaler',
  'light',
  '19BBY',
  'Polis Massa', // String with valid planet
  '!!!@@@###',
  'Luke Skywalker Leia Organa',
  ' ',
];


test(`@SMOKE Validate invalid search does not return people cards`, async ({
  searchPage,
}) => {
  const failedKeywords: string[] = [];

  for (const keyword of INVALID_SEARCH_INPUTS) {
    await test.step(`Search: ${keyword}`, async () => {
      await searchPage.searchPeopleInput(keyword);
    });

    await test.step(`Validate result for: ${keyword}`, async () => {
      const searchState = await searchPage.collectInvalidSearchState(keyword);

      const hasLoading = searchState.loading;
      const hasNotFoundMessage = searchState.notFound;
      const hasPeopleCards = searchState.cards > 0;

      if (hasLoading || !hasNotFoundMessage || hasPeopleCards) {
        console.log(
          `Invalid search failed: "${keyword}" ` +
          `(loading=${hasLoading}, notFound=${hasNotFoundMessage}, cards=${searchState.cards})`
        );
        failedKeywords.push(keyword);
      }
    });
  }

  expect(failedKeywords).toEqual([]);
});
