import { ClientOptions, PuppeteerOptions } from '../types/puppeteer.types.cjs';
import EventEmitter from 'node:events';
import { EventListenerCallBack } from '../types/client.types.cjs';

declare class Ihbp extends EventEmitter {
    private readonly puppeteerOptions?;
    private options;
    private page?;
    private browser?;
    private pwned;
    private userAgent;
    constructor(options: ClientOptions, puppeteerOptions?: Partial<PuppeteerOptions>);
    when(event: string, listener: EventListenerCallBack): void;
    init(): Promise<void>;
    protected isPasswordPwned(password: string): Promise<{
        isPasswordPwned: boolean;
        message: string;
    } | {
        message: string;
        isPasswordPwned?: undefined;
    } | undefined>;
    protected isEmailPwned(email: string): Promise<{
        isEmailPwned: boolean;
        message: string;
    } | {
        message: string;
        isEmailPwned?: undefined;
    } | undefined>;
    private initializeBrowser;
    private configurePageOptions;
    private navigateToHIBP;
    private waitFor;
    private onEvent;
}

export { Ihbp };
