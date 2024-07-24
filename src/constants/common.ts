import {ClientOptions, PuppeteerOptions} from "@/types/puppeteer.types";


export const HIBP_URL: string = 'https://haveibeenpwned.com/'
export const HIBP_REFERRER: string = 'https://www.google.com/search?q=ihave+been+pwned&oq=ihave+been+pwned&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTINCAEQLhiDARixAxiABDIHCAIQABiABDINCAMQLhjHARjRAxiABDIHCAQQLhiABDIJCAUQABgKGIAEMgcIBhAAGIAEMgcIBxAAGIAEMgcICBAAGIAE0gEIMzkwOWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8'

export const DEFAULT_PUPPETEER_OPTIONS: PuppeteerOptions = {
    headless: false,
    defaultViewport: null,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
    ],
}

export const DEFAULT_CLIENT_OPTIONS: ClientOptions = {
    authTimeoutMs: 0,
    qrMaxRetries: 0,
    takeoverOnConflict: false,
    takeoverTimeoutMs: 0,
    ffmpegPath: "ffmpeg",
    bypassCSP: true,
    proxyAuthentication: undefined
};
