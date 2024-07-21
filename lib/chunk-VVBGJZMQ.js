import {
  DEFAULT_CLIENT_OPTIONS,
  DEFAULT_PUPPETEER_OPTIONS,
  HIBP_REFERRER,
  HIBP_URL
} from "./chunk-JUV3W44H.js";
import {
  Password
} from "./chunk-YFSANIN6.js";
import {
  __publicField
} from "./chunk-PKBMQBKP.js";

// src/client/Client.ts
import puppeteer from "puppeteer";
import EventEmitter from "node:events";
var Ihbp = class extends EventEmitter {
  constructor(options, puppeteerOptions = {}) {
    super();
    __publicField(this, "puppeteerOptions");
    __publicField(this, "options");
    __publicField(this, "page");
    __publicField(this, "browser");
    __publicField(this, "password");
    this.puppeteerOptions = { ...DEFAULT_PUPPETEER_OPTIONS, ...puppeteerOptions };
    this.options = { ...DEFAULT_CLIENT_OPTIONS, ...options };
    this.password = new Password();
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
    return await this.password.isPasswordPwned(this.page, password);
  }
  async initializeBrowser() {
    try {
      this.browser = await puppeteer.launch(this.puppeteerOptions);
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
    if (this.options.userAgent != null) {
      await this.page.setUserAgent(this.options.userAgent);
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
  async waitFor(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
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
