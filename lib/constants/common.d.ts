import { PuppeteerOptions, ClientOptions } from '../types/puppeteer.types.js';

declare const HIBP_URL: string;
declare const HIBP_REFERRER: string;
declare const DEFAULT_PUPPETEER_OPTIONS: PuppeteerOptions;
declare const DEFAULT_CLIENT_OPTIONS: ClientOptions;

export { DEFAULT_CLIENT_OPTIONS, DEFAULT_PUPPETEER_OPTIONS, HIBP_REFERRER, HIBP_URL };
