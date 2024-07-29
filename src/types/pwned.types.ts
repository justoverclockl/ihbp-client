import { Page } from 'puppeteer'
import { ErrorMessageType, IsEmailPwnedResultType, IsPwPwnedResultType } from './client.types'

export declare class Pwned {
    private readonly navLink: string;
    private readonly pwInput: string;
    private readonly emailInput: string;
    private readonly pwnedBtn: string;
    private readonly searchPwnageBtn: string;
    private readonly messageContainer: string;
    private readonly messageEmailContainer: string;
    private readonly pwnedMessage: string;
    private readonly homeLink: string;

    constructor();

    isEmailPwned(page: Page, email: string): Promise<IsEmailPwnedResultType | ErrorMessageType | undefined>;
    isPasswordPwned(page: Page, password: string): Promise<IsPwPwnedResultType | ErrorMessageType | undefined>;

    private waitFor(minDelay: number, maxDelay: number): Promise<void>;
    private isConfirmationMessageInDom(page: Page, selector: string): Promise<boolean>;
}
