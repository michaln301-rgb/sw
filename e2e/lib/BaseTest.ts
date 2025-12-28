import { SearchPage } from '../pages/SearchPage';
import { test as baseTest } from '@playwright/test';

const test = baseTest.extend<{
  searchPage: SearchPage;
}>({

  searchPage: async ({ page, context }, use) => {
    await use(new SearchPage(page, context));
  },

});

export default test;
