import {ClientOptions, PuppeteerOptions} from "@/types/puppeteer.types";
import puppeteer, {Browser, Page} from "puppeteer";
import {DEFAULT_CLIENT_OPTIONS, DEFAULT_PUPPETEER_OPTIONS, HIBP_URL} from "@constants/common";
import EventEmitter from "node:events";

export class Client extends EventEmitter {
    private readonly puppeteerOptions?: PuppeteerOptions
    private options: ClientOptions
    private page?: Page
    private browser?: Browser

    constructor(options: ClientOptions, puppeteerOptions: Partial<PuppeteerOptions> = {}) {
        super();
        this.puppeteerOptions = {...DEFAULT_PUPPETEER_OPTIONS, ...puppeteerOptions}
        this.options = { ...DEFAULT_CLIENT_OPTIONS, ...options }
    }


    async init() {
        await this.initializeBrowser()
        await this.configurePageOptions()
        await this.navigateToHIBP()
    }

    private async initializeBrowser(): Promise<void> {
        try {
            this.browser = await puppeteer.launch(this.puppeteerOptions)
            const pages: Page[] = await this.browser.pages()
            this.page =
                pages.length > 0 ? pages[0] : await this.browser.newPage()

            if (this.browser && this.page) {
                this.emit('client ready')
            }
        } catch (error) {
            this.emit('client crashed')
            throw error
        }
    }

    private async configurePageOptions(): Promise<void> {
        if (!this.page) return

        if (this.options.userAgent != null) {
            await this.page.setUserAgent(this.options.userAgent)
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
            referer: 'https://google.it/',
        })
    }
}
