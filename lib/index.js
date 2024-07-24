var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/constants/common.ts
var HIBP_URL = "https://haveibeenpwned.com/";
var HIBP_REFERRER = "https://www.google.com/search?q=ihave+been+pwned&oq=ihave+been+pwned&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTINCAEQLhiDARixAxiABDIHCAIQABiABDINCAMQLhjHARjRAxiABDIHCAQQLhiABDIJCAUQABgKGIAEMgcIBhAAGIAEMgcIBxAAGIAEMgcICBAAGIAE0gEIMzkwOWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8";
var DEFAULT_PUPPETEER_OPTIONS = {
  headless: false,
  defaultViewport: null,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
};
var DEFAULT_CLIENT_OPTIONS = {
  authTimeoutMs: 0,
  qrMaxRetries: 0,
  takeoverOnConflict: false,
  takeoverTimeoutMs: 0,
  ffmpegPath: "ffmpeg",
  bypassCSP: true,
  proxyAuthentication: void 0
};

// src/client/Client.ts
import EventEmitter from "node:events";

// src/constants/selectors.ts
var PASSWORD_NAVBAR_LINK = 'a[href="/Passwords"]';
var HOME_NAVBAR_LINK = 'a[href="/Home"]';
var PASSWORD_INPUT = 'input[placeholder="password"]';
var EMAIL_INPUT = 'input[placeholder="email address"]';
var PWNED_BTN = "#searchPwnedPasswords";
var EMAIL_BTN = "#searchPwnage";
var PWNED_MESSAGE_CONTAINER = ".pwnTitle";
var PWNED_MESSAGE_RESULT = "#pwnedPasswordResult";
var PWNED_EMAIL_RESULT = ".pwnTitle";

// src/utils/elementObserver.ts
var isElementInDom = async (page, elementSelector) => {
  try {
    const isElement = await page?.evaluate(
      async (selector) => {
        return new Promise((resolve) => {
          const element = document.querySelector(selector);
          if (element) {
            resolve(true);
            return;
          }
          const observer = new MutationObserver(
            () => {
              const scannedElement = document.querySelector(selector);
              if (scannedElement) {
                observer.disconnect();
                resolve(true);
              }
            }
          );
          observer.observe(document, {
            childList: true,
            subtree: true
          });
          setTimeout(() => {
            observer.disconnect();
            resolve(false);
          }, 5e3);
        });
      },
      elementSelector
    );
    return isElement || false;
  } catch (error) {
    return false;
  }
};

// src/client/pwned.ts
var Pwned = class {
  constructor() {
    __publicField(this, "navLink", PASSWORD_NAVBAR_LINK);
    __publicField(this, "pwInput", PASSWORD_INPUT);
    __publicField(this, "emailInput", EMAIL_INPUT);
    __publicField(this, "pwnedBtn", PWNED_BTN);
    __publicField(this, "searchPwnageBtn", EMAIL_BTN);
    __publicField(this, "messageContainer", PWNED_MESSAGE_CONTAINER);
    __publicField(this, "messageEmailContainer", PWNED_EMAIL_RESULT);
    __publicField(this, "pwnedMessage", PWNED_MESSAGE_RESULT);
    __publicField(this, "homeLink", HOME_NAVBAR_LINK);
  }
  async isEmailPwned(page, email) {
    try {
      await page.type(this.emailInput, email, { delay: 120 });
      await page.click(this.searchPwnageBtn);
      const isResponseAvailable = await this.isConfirmationMessageInDom(
        page,
        this.messageContainer
      );
      if (isResponseAvailable) {
        await this.waitFor(1500, 2500);
        const messageContent = await page.$eval(
          this.messageEmailContainer,
          (el) => el.textContent?.trim() || ""
        );
        return {
          isEmailPwned: true,
          message: messageContent
        };
      }
    } catch (error) {
      return {
        message: "An error occurred"
      };
    }
  }
  async isPasswordPwned(page, password) {
    try {
      await page.waitForSelector(this.navLink, {
        visible: true,
        timeout: 5e4
      });
      await page.click(this.navLink);
      await this.waitFor(1e3, 2e3);
      await page.type(this.pwInput, password, { delay: 120 });
      await page.click(this.pwnedBtn);
      const isResponseAvailable = await this.isConfirmationMessageInDom(
        page,
        this.messageContainer
      );
      if (isResponseAvailable) {
        await this.waitFor(1e3, 2e3);
        const messageContent = await page.$eval(
          this.pwnedMessage,
          (el) => el.textContent?.trim() || ""
        );
        return {
          isPasswordPwned: true,
          message: messageContent
        };
      }
    } catch (error) {
      return {
        message: "An error occurred"
      };
    }
  }
  async waitFor(minDelay, maxDelay) {
    const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(
      (resolve) => setTimeout(() => resolve(), randomDelay(minDelay, maxDelay))
    );
  }
  async isConfirmationMessageInDom(page, selector) {
    try {
      return await isElementInDom(page, selector);
    } catch (error) {
      return false;
    }
  }
};

// src/client/Client.ts
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
  DEFAULT_CLIENT_OPTIONS,
  DEFAULT_PUPPETEER_OPTIONS,
  EMAIL_BTN,
  EMAIL_INPUT,
  HIBP_REFERRER,
  HIBP_URL,
  HOME_NAVBAR_LINK,
  Ihbp,
  PASSWORD_INPUT,
  PASSWORD_NAVBAR_LINK,
  PWNED_BTN,
  PWNED_EMAIL_RESULT,
  PWNED_MESSAGE_CONTAINER,
  PWNED_MESSAGE_RESULT,
  Pwned
};
