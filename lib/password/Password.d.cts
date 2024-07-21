import { Page } from 'puppeteer';

declare class Password {
    private readonly navLink;
    private readonly pwInput;
    private readonly pwnedBtn;
    private readonly messageContainer;
    private readonly pwnedMessage;
    constructor();
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

export { Password };
