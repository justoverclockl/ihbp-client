import { Page } from 'puppeteer'
import {
    PASSWORD_NAVBAR_LINK,
    PASSWORD_INPUT,
    PWNED_BTN,
    PWNED_MESSAGE_CONTAINER,
    PWNED_MESSAGE_RESULT,
} from '@constants/selectors'
import { isElementInDom } from '@/utils/elementObserver'

export class Password {
    private readonly navLink: string = PASSWORD_NAVBAR_LINK;
    private readonly pwInput: string = PASSWORD_INPUT;
    private readonly pwnedBtn: string = PWNED_BTN;
    private readonly messageContainer: string = PWNED_MESSAGE_CONTAINER;
    private readonly pwnedMessage: string = PWNED_MESSAGE_RESULT;

    constructor() {
        this.navLink = PASSWORD_NAVBAR_LINK;
        this.pwInput = PASSWORD_INPUT
        this.pwnedBtn = PWNED_BTN
        this.messageContainer = PWNED_MESSAGE_CONTAINER
        this.pwnedMessage = PWNED_MESSAGE_RESULT
    }

    async isPasswordPwned(page: Page, password: string) {
        try {
            await page.waitForSelector(this.navLink, { visible: true, timeout: 50000 });
            await page.click(this.navLink);
            await this.waitFor(1000)
            await page.type(PASSWORD_INPUT, password, { delay: 120 })
            await page.click(this.pwnedBtn);

            const isResponseAvailable: boolean = await this.isConfirmationMessageInDom(page)

            if (isResponseAvailable) {
                await this.waitFor(1500)
                const messageContent = await page.$eval(this.pwnedMessage, el => el.textContent?.trim() || '');
                return {
                    isPasswordPwned: true,
                    message: messageContent
                };
            }

            return {
                message: 'Nessun riferimento trovato'
            }
        } catch (error) {
            console.error('Error in isPasswordPwned:', error);
            return {
                message: 'An error occurred',
            };
        }
    }

    private async waitFor(ms: number): Promise<void> {
        return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
    }

    private async isConfirmationMessageInDom(page: Page) {
        try {
            return await isElementInDom(page, PWNED_MESSAGE_CONTAINER)
        } catch (error) {
            return false;
        }
    }
}
