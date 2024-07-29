import {Browser, Page} from "puppeteer";
import {DEFAULT_CLIENT_OPTIONS, DEFAULT_PUPPETEER_OPTIONS, HIBP_URL, HIBP_REFERRER} from "@constants/common";
import EventEmitter from "node:events";
import { Pwned } from '@client/Pwned'
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import UserAgent from 'user-agents';
import {
    ClientOptions,
    ErrorMessageType,
    EventListenerCallBack, EventsType,
    IsEmailPwnedResultType, IsPwPwnedResultType,
    PuppeteerOptions,
} from '../types'


export class Ihbp extends EventEmitter {
    private readonly puppeteerOptions?: PuppeteerOptions
    private options: ClientOptions
    private page?: Page
    private browser?: Browser
    private pwned: Pwned
    private userAgent: UserAgent

    constructor(options: ClientOptions, puppeteerOptions: Partial<PuppeteerOptions> = {}) {
        super();
        this.puppeteerOptions = {...DEFAULT_PUPPETEER_OPTIONS, ...puppeteerOptions}
        this.options = { ...DEFAULT_CLIENT_OPTIONS, ...options }
        this.pwned = new Pwned()
        this.userAgent = new UserAgent()
    }


    protected when(event: string, listener: EventListenerCallBack) {
        this.on(event, listener)
    }

    protected async init() {
        await this.initializeBrowser()
        await this.configurePageOptions()
        await this.navigateToHIBP()
    }

    protected async isPasswordPwned(password: string): Promise<IsPwPwnedResultType | ErrorMessageType | undefined> {
        return await this.pwned.isPasswordPwned(this.page!, password)
    }

    protected async isEmailPwned(email: string): Promise<IsEmailPwnedResultType | ErrorMessageType | undefined> {
        await this.navigateToHIBP()
        return await this.pwned.isEmailPwned(this.page!, email)
    }

    private async initializeBrowser(): Promise<void> {
        try {
            this.browser = await puppeteer
                .use(StealthPlugin())
                .launch(this.puppeteerOptions)
            const pages: Page[] = await this.browser.pages()
            this.page =
                pages.length > 0 ? pages[0] : await this.browser.newPage()

            if (this.browser && this.page) {
                this.emit(EventsType.CLIENT_READY)
            }
        } catch (error) {
            this.emit(EventsType.CLIENT_CRASHED)
            throw error
        }
    }

    private async configurePageOptions(): Promise<void> {
        if (!this.page) return

        await this.page.setViewport({
            width: Math.floor(Math.random() * (1920 - 1366 + 1)) + 1366,
            height: Math.floor(Math.random() * (1080 - 768 + 1)) + 768,
            deviceScaleFactor: 1,
            isMobile: false,
            hasTouch: false,
            isLandscape: false,
        });

        if (this.options.userAgent != null || this.options.userAgent === undefined) {
            await this.page.setUserAgent(this.userAgent.random().toString())
        }

        if (this.options.proxyAuthentication) {
            await this.page.authenticate(this.options.proxyAuthentication)
        }

        if (this.options.bypassCSP) {
            await this.page.setBypassCSP(this.options.bypassCSP)
        }

        await this.page.evaluateOnNewDocument((): void => {
            ;(window as any).Error = Error
        })
    }

    private async navigateToHIBP(): Promise<void> {
        await this.page?.goto(HIBP_URL, {
            waitUntil: 'networkidle0',
            timeout: 0,
            referer: HIBP_REFERRER,
        })
    }

    private async waitFor(ms: number, minDelay: number, maxDelay: number): Promise<void> {
        const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
        return new Promise<void>(resolve => setTimeout(() => resolve(), randomDelay(minDelay, maxDelay)));
    }

    private onEvent(eventName: string, cb: EventListenerCallBack): this {
        return this.on(eventName, (...args: any[]) => {
            cb(...args);
        });
    }
}
