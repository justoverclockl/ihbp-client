import { Page } from 'puppeteer';

declare const isElementInDom: (page: Page, elementSelector: string) => Promise<boolean>;

export { isElementInDom };
