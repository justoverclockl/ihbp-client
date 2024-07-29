import EventEmitter from 'node:events';

type PuppeteerArgs = '--no-sandbox' | '--disable-setuid-sandbox' | '--disable-infobars' | '--single-process' | '--no-zygote' | '--no-first-run' | '--window-position=0,0' | '--ignore-certificate-errors' | '--ignore-certificate-errors-skip-list' | '--disable-dev-shm-usage' | '--disable-accelerated-2d-canvas' | '--disable-gpu' | '--hide-scrollbars' | '--disable-notifications' | '--disable-background-timer-throttling' | '--disable-backgrounding-occluded-windows' | '--disable-breakpad' | '--disable-component-extensions-with-background-pages' | '--disable-extensions' | '--disable-features=TranslateUI,BlinkGenPropertyTrees' | '--disable-ipc-flooding-protection' | '--disable-renderer-backgrounding' | '--enable-features=NetworkService,NetworkServiceInProcess' | '--force-color-profile=srgb' | '--metrics-recording-only' | '--mute-audio' | '--disable-web-security' | '--auto-open-devtools-for-tabs';
interface PuppeteerOptions {
    headless: boolean;
    defaultViewport: null;
    args: PuppeteerArgs[];
}
interface ClientOptions {
    browserWSEndpoint?: string;
    browserURL?: string;
    authTimeoutMs?: number;
    qrMaxRetries?: number;
    takeoverOnConflict?: boolean;
    takeoverTimeoutMs?: number;
    userAgent?: string;
    ffmpegPath?: 'ffmpeg';
    bypassCSP?: boolean;
    proxyAuthentication?: undefined;
    userDataPath?: string;
}

type EventListenerCallBack = (...args: any[]) => any | void;
type IsPwPwnedResultType = {
    isPasswordPwned: boolean;
    message: string;
};
type IsEmailPwnedResultType = {
    isPasswordPwned: boolean;
    message: string;
};
declare class Ihbp extends EventEmitter {
    private readonly puppeteerOptions?;
    private options;
    private page?;
    private browser?;
    private pwned;
    private userAgent;
    constructor(options: ClientOptions, puppeteerOptions?: Partial<PuppeteerOptions>);
    when(event: string, listener: EventListenerCallBack): void;
    protected init(): Promise<void>;
    protected isPasswordPwned(password: string): Promise<IsPwPwnedResultType>;
    protected isEmailPwned(email: string): Promise<IsEmailPwnedResultType>;
    private initializeBrowser;
    private configurePageOptions;
    private navigateToHIBP;
    private waitFor;
    private onEvent;
}

export { type ClientOptions, type EventListenerCallBack, Ihbp, type IsEmailPwnedResultType, type IsPwPwnedResultType, type PuppeteerArgs, type PuppeteerOptions };
