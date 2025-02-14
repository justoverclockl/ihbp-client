import EventEmitter from 'node:events'
import { ClientOptions, PuppeteerOptions } from './puppeteer.types'
import { Browser, Page } from 'puppeteer'
import { Pwned } from '@client/Pwned'
import UserAgent from 'user-agents'

export type EventListenerCallBack = (...args: any[]) => any | void;

export type ErrorMessageType = {
    message: string
    errorMessage: string | unknown
}

export type IsPwPwnedResultType = {
    isPasswordPwned: boolean
    message: string
}

export type IsEmailPwnedResultType = {
    isEmailPwned: boolean
    message: string
}

export declare class Ihbp extends EventEmitter {
    private readonly puppeteerOptions?: PuppeteerOptions;
    private options: ClientOptions;
    private page?: Page;
    private browser?: Browser;
    private pwned: Pwned;
    private userAgent: UserAgent;

    constructor(options: ClientOptions, puppeteerOptions?: Partial<PuppeteerOptions>);

    when(event: string, listener: EventListenerCallBack): void;

    public init(): Promise<void>;

    public isPasswordPwned(password: string): Promise<IsPwPwnedResultType>;

    public isEmailPwned(email: string): Promise<IsEmailPwnedResultType>;

    private initializeBrowser(): Promise<void>;

    private configurePageOptions(): Promise<void>;

    private navigateToHIBP(): Promise<void>;

    private waitFor(ms: number, minDelay: number, maxDelay: number): Promise<void>;

    private onEvent(eventName: string, cb: EventListenerCallBack): this;
}
