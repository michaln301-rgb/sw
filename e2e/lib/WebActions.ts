import type { BrowserContext, Page } from '@playwright/test';

export class WebActions {
  // eslint-disable-next-line
  readonly page: Page;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  async delay(time: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
}
