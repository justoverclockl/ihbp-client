import { Page } from 'puppeteer';

declare class Pwned {
    private readonly navLink;
    private readonly pwInput;
    private readonly emailInput;
    private readonly pwnedBtn;
    private readonly searchPwnageBtn;
    private readonly messageContainer;
    private readonly messageEmailContainer;
    private readonly pwnedMessage;
    private readonly homeLink;
    constructor();
    isEmailPwned(page: Page, email: string): Promise<{
        isEmailPwned: boolean;
        message: string;
    } | {
        message: string;
        isEmailPwned?: undefined;
    } | undefined>;
    isPasswordPwned(page: Page, password: string): Promise<{
        isPasswordPwned: boolean;
        message: string;
    } | {
        message: string;
        isPasswordPwned?: undefined;
    } | undefined>;
    private waitFor;
    private isConfirmationMessageInDom;
}

export { Pwned };
