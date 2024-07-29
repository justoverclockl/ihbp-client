import { Page } from 'puppeteer'
import {
    PASSWORD_NAVBAR_LINK,
    PASSWORD_INPUT,
    PWNED_BTN,
    PWNED_MESSAGE_CONTAINER,
    PWNED_MESSAGE_RESULT, HOME_NAVBAR_LINK, EMAIL_INPUT, EMAIL_BTN, PWNED_EMAIL_RESULT,
} from '@constants/selectors'
import { isElementInDom } from '../utils'
import { ErrorMessageType, IsEmailPwnedResultType, IsPwPwnedResultType } from '../types'


export class Pwned {
    private readonly navLink: string = PASSWORD_NAVBAR_LINK;
    private readonly pwInput: string = PASSWORD_INPUT;
    private readonly emailInput: string = EMAIL_INPUT;
    private readonly pwnedBtn: string = PWNED_BTN;
    private readonly searchPwnageBtn: string = EMAIL_BTN;
    private readonly messageContainer: string = PWNED_MESSAGE_CONTAINER;
    private readonly messageEmailContainer: string = PWNED_EMAIL_RESULT;
    private readonly pwnedMessage: string = PWNED_MESSAGE_RESULT;
    private readonly homeLink: string = HOME_NAVBAR_LINK

    constructor() {}

    async isEmailPwned(page: Page, email: string): Promise<IsEmailPwnedResultType | ErrorMessageType | undefined> {
        try {
            await page.type(this.emailInput, email, { delay: 120 })
            await page.click(this.searchPwnageBtn)

            const isResponseAvailable: boolean = await this.isConfirmationMessageInDom(page, this.messageContainer)

            if (isResponseAvailable) {
                await this.waitFor(1500, 2500)
                const messageContent: string = await page.$eval(this.messageEmailContainer, el => el.textContent?.trim() || '');

                return {
                    isEmailPwned: true,
                    message: messageContent
                };
            }
        } catch (error) {
            return {
                message: 'An error occurred',
                errorMessage: error instanceof Error ? error.message : String(error)
            };
        }
    }

    async isPasswordPwned(page: Page, password: string): Promise<IsPwPwnedResultType | ErrorMessageType | undefined> {
        try {
            await page.waitForSelector(this.navLink, { visible: true, timeout: 50000 });
            await page.click(this.navLink);
            await this.waitFor(1000, 2000)
            await page.type(this.pwInput, password, { delay: 120 })
            await page.click(this.pwnedBtn);

            const isResponseAvailable: boolean = await this.isConfirmationMessageInDom(page, this.messageContainer)

            if (isResponseAvailable) {
                await this.waitFor(1500, 2500)
                const messageContent: string = await page.$eval(this.pwnedMessage, el => el.textContent?.trim() || '');

                return {
                    isPasswordPwned: true,
                    message: messageContent
                };
            }
        } catch (error) {
            return {
                message: 'An error occurred',
                errorMessage: error instanceof Error ? error.message : String(error)
            };
        }
    }

    private async waitFor(minDelay: number, maxDelay: number): Promise<void> {
        const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
        return new Promise<void>(resolve => setTimeout(() => resolve(), randomDelay(minDelay, maxDelay)));
    }

    private async isConfirmationMessageInDom(page: Page, selector: string): Promise<boolean> {
        try {
            return await isElementInDom(page, selector)
        } catch (error) {
            return false;
        }
    }
}
