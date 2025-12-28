import { expect, type BrowserContext, type Locator, type Page } from '@playwright/test';
import { testConfig } from '../../testConfig';
import { PeopleInformationCardComponent } from '../commponents/PeopleInformationCardComponent';

export class SearchPage {
  readonly page: Page;
  readonly context: BrowserContext;

  readonly PEOPLE_INPUT: Locator;
  readonly PLANETS_INPUT: Locator;
  readonly SEARCH_INPUT: Locator;
  readonly SEARCH_BUTTON: Locator;
  readonly CARD_BODY: Locator;
  readonly CARD_SUBTITLE: Locator;
  readonly CARD_SUBTITLE_RAW: string;
  readonly CARD_ROW: string;
  readonly CARD_ROW_LABEL: string;
  readonly CARD_ROW_VALUE: string;
  readonly LOADING_TEXT: Locator;
  readonly NOT_FOUND_TEXT: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;


    this.CARD_ROW = '.row';
    this.CARD_ROW_LABEL = '.col-sm-2';
    this.CARD_ROW_VALUE = '.col-sm-10';
    this.CARD_SUBTITLE_RAW = 'h6.card-subtitle';
    this.CARD_SUBTITLE = page.locator(this.CARD_SUBTITLE_RAW);
    this.PEOPLE_INPUT = page.locator('#people');
    this.PLANETS_INPUT = page.locator('#planets');
    this.SEARCH_INPUT = page.locator('#query');
    this.SEARCH_BUTTON = page.getByRole('button', { name: 'Search' });
    this.CARD_BODY = page.locator('.card-body');
    this.LOADING_TEXT = page.getByText('Loading...', { exact: true });
    this.NOT_FOUND_TEXT = page.getByText('Not found.', { exact: true });
  }

  async navigateToURL(): Promise<void> {
    await this.page.goto(testConfig.prod);
  }

  async searchPeopleInput(name: string): Promise<void> {
    await this.PEOPLE_INPUT.check();
    await this.SEARCH_INPUT.fill(name);
    await this.SEARCH_BUTTON.click();
  }

  async searchPlanetsInput(name: string): Promise<void> {
    await this.PLANETS_INPUT.check();
    await this.SEARCH_INPUT.fill(name);
    await this.SEARCH_BUTTON.click();
  }

  peopleInformationCard(personName: string): PeopleInformationCardComponent {
    const subtitle = this.CARD_SUBTITLE.filter({ hasText: personName });
    const cardBody = this.CARD_BODY.filter({ has: subtitle }).first();

    return new PeopleInformationCardComponent(cardBody, {
      subtitle: this.CARD_SUBTITLE_RAW,
      row: this.CARD_ROW,
      label: this.CARD_ROW_LABEL,
      value: this.CARD_ROW_VALUE,
    });
  }

  async expectRowsNotPresent(rows: Record<string, string>) {
  for (const [label, value] of Object.entries(rows)) {
    await expect(this.page.getByText(label, { exact: true })).toHaveCount(0);
    await expect(this.page.getByText(value, { exact: true })).toHaveCount(0);
  }
}

async collectInvalidSearchState(keyword: string) {
  await this.LOADING_TEXT.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
  await this.NOT_FOUND_TEXT.waitFor({ state: 'visible', timeout: 1000}).catch(() => {});

  return {
    keyword,
    loading: await this.LOADING_TEXT.isVisible().catch(() => false),
    notFound: await this.NOT_FOUND_TEXT.isVisible().catch(() => false),
    cards: await this.CARD_BODY.count().catch(() => 0),
  };
}
}
