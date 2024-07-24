import {
  Pwned
} from "./chunk-YSEJIUOX.js";
import {
  DEFAULT_CLIENT_OPTIONS,
  DEFAULT_PUPPETEER_OPTIONS,
  HIBP_REFERRER,
  HIBP_URL
} from "./chunk-P2OSGG5S.js";
import {
  __publicField
} from "./chunk-PKBMQBKP.js";

// src/client/Client.ts
import EventEmitter from "node:events";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import UserAgent from "user-agents";
var Ihbp = class extends EventEmitter {
  constructor(options, puppeteerOptions = {}) {
    super();
    __publicField(this, "puppeteerOptions");
    __publicField(this, "options");
    __publicField(this, "page");
    __publicField(this, "browser");
    __publicField(this, "pwned");
    __publicField(this, "userAgent");
    this.puppeteerOptions = {
      ...DEFAULT_PUPPETEER_OPTIONS,
      ...puppeteerOptions
    };
    this.options = { ...DEFAULT_CLIENT_OPTIONS, ...options };
    this.pwned = new Pwned();
    this.userAgent = new UserAgent();
  }
  when(event, listener) {
    this.on(event, listener);
  }
  async init() {
    await this.initializeBrowser();
    await this.configurePageOptions();
    await this.navigateToHIBP();
  }
  async isPasswordPwned(password) {
    return await this.pwned.isPasswordPwned(this.page, password);
  }
  async isEmailPwned(email) {
    await this.navigateToHIBP();
    return await this.pwned.isEmailPwned(this.page, email);
  }
  async initializeBrowser() {
    try {
      this.browser = await puppeteer.use(StealthPlugin()).launch(this.puppeteerOptions);
      const pages = await this.browser.pages();
      this.page = pages.length > 0 ? pages[0] : await this.browser.newPage();
      if (this.browser && this.page) {
        this.emit("client ready");
      }
    } catch (error) {
      this.emit("client crashed");
      throw error;
    }
  }
  async configurePageOptions() {
    if (!this.page) return;
    await this.page.setViewport({
      width: Math.floor(Math.random() * (1920 - 1366 + 1)) + 1366,
      height: Math.floor(Math.random() * (1080 - 768 + 1)) + 768,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    });
    if (this.options.userAgent != null || this.options.userAgent === void 0) {
      console.log(this.userAgent.random().toString());
      await this.page.setUserAgent(this.userAgent.random().toString());
    }
    if (this.options.proxyAuthentication) {
      await this.page.authenticate(this.options.proxyAuthentication);
    }
    if (this.options.bypassCSP) {
      await this.page.setBypassCSP(this.options.bypassCSP);
    }
    await this.page.evaluateOnNewDocument(() => {
      ;
      window.Error = Error;
    });
  }
  async navigateToHIBP() {
    await this.page?.goto(HIBP_URL, {
      waitUntil: "networkidle0",
      timeout: 0,
      referer: HIBP_REFERRER
    });
  }
  async waitFor(ms, minDelay, maxDelay) {
    const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(
      (resolve) => setTimeout(() => resolve(), randomDelay(minDelay, maxDelay))
    );
  }
  onEvent(eventName, cb) {
    return this.on(eventName, (...args) => {
      cb(...args);
    });
  }
};

export {
  Ihbp
};
