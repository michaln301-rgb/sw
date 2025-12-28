import { expect, type Locator } from '@playwright/test';

type CardSelectors = {
  subtitle: string;
  row: string;
  label: string;
  value: string;
};

export class PeopleInformationCardComponent {
  private readonly cardRoot: Locator;
  private readonly selectors: CardSelectors;

  constructor(cardBodyRoot: Locator, selectors: CardSelectors) {
    this.cardRoot = cardBodyRoot;
    this.selectors = selectors;
  }

  async expectTitle(expectedTitle: string): Promise<void> {
    const titleLocator = this.cardRoot.locator(this.selectors.subtitle);
    await expect(titleLocator).toContainText(expectedTitle);
  }

  async expectRows(expectedRows: Record<string, string>): Promise<void> {
    await expect(this.cardRoot).toBeVisible();

    const actualRows = await this.readAllRows();

    for (const [expectedLabel, expectedValue] of Object.entries(expectedRows)) {
      expect(
        actualRows,
        `Row "${expectedLabel}" was not found. Available rows: ${Object.keys(actualRows).join(', ')}`
      ).toHaveProperty(expectedLabel);

      expect(
        actualRows[expectedLabel],
        `Row "${expectedLabel}" value mismatch.`
      ).toBe(expectedValue);
    }
  }

  private async readAllRows(): Promise<Record<string, string>> {
    const rowLocator = this.cardRoot.locator(this.selectors.row);

    const rowPairs = await rowLocator.evaluateAll(
      (rowElements, rowSelectors) => {
        const result: Record<string, string> = {};

        for (const rowElement of rowElements) {
          const labelElement = rowElement.querySelector(rowSelectors.label);
          const valueElement = rowElement.querySelector(rowSelectors.value);

          const labelText = (labelElement?.textContent ?? '').trim();
          const valueText = (valueElement?.textContent ?? '').trim();

          if (labelText.length > 0) {
            result[labelText] = valueText;
          }
        }

        return result;
      },
      {
        label: this.selectors.label,
        value: this.selectors.value,
      }
    );

    return rowPairs;
  }
}
