import {ClientOptions, PuppeteerOptions} from "@/types/puppeteer.types";


export const HIBP_URL: string = 'https://haveibeenpwned.com/'

export const DEFAULT_PUPPETEER_OPTIONS: PuppeteerOptions = {
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
}

export const DEFAULT_CLIENT_OPTIONS: ClientOptions = {
    authTimeoutMs: 0,
    qrMaxRetries: 0,
    takeoverOnConflict: false,
    takeoverTimeoutMs: 0,
    userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
    ffmpegPath: "ffmpeg",
    bypassCSP: false,
    proxyAuthentication: undefined
};
