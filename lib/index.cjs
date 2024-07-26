"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Ihbp: () => Ihbp,
  Pwned: () => Pwned,
  clientTypes: () => client_types_exports,
  common: () => common_exports,
  puppeteerTypes: () => puppeteer_types_exports,
  selectors: () => selectors_exports,
  utils: () => utils_exports
});
module.exports = __toCommonJS(src_exports);

// src/constants/common.ts
var common_exports = {};
__export(common_exports, {
  DEFAULT_CLIENT_OPTIONS: () => DEFAULT_CLIENT_OPTIONS,
  DEFAULT_PUPPETEER_OPTIONS: () => DEFAULT_PUPPETEER_OPTIONS,
  HIBP_REFERRER: () => HIBP_REFERRER,
  HIBP_URL: () => HIBP_URL
});
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
var import_node_events = __toESM(require("events"), 1);

// src/constants/selectors.ts
var selectors_exports = {};
__export(selectors_exports, {
  EMAIL_BTN: () => EMAIL_BTN,
  EMAIL_INPUT: () => EMAIL_INPUT,
  HOME_NAVBAR_LINK: () => HOME_NAVBAR_LINK,
  PASSWORD_INPUT: () => PASSWORD_INPUT,
  PASSWORD_NAVBAR_LINK: () => PASSWORD_NAVBAR_LINK,
  PWNED_BTN: () => PWNED_BTN,
  PWNED_EMAIL_RESULT: () => PWNED_EMAIL_RESULT,
  PWNED_MESSAGE_CONTAINER: () => PWNED_MESSAGE_CONTAINER,
  PWNED_MESSAGE_RESULT: () => PWNED_MESSAGE_RESULT
});
var PASSWORD_NAVBAR_LINK = 'a[href="/Passwords"]';
var HOME_NAVBAR_LINK = 'a[href="/Home"]';
var PASSWORD_INPUT = 'input[placeholder="password"]';
var EMAIL_INPUT = 'input[placeholder="email address"]';
var PWNED_BTN = "#searchPwnedPasswords";
var EMAIL_BTN = "#searchPwnage";
var PWNED_MESSAGE_CONTAINER = ".pwnTitle";
var PWNED_MESSAGE_RESULT = "#pwnedPasswordResult";
var PWNED_EMAIL_RESULT = ".pwnTitle";

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  isElementInDom: () => isElementInDom
});

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
    this.navLink = PASSWORD_NAVBAR_LINK;
    this.pwInput = PASSWORD_INPUT;
    this.emailInput = EMAIL_INPUT;
    this.pwnedBtn = PWNED_BTN;
    this.searchPwnageBtn = EMAIL_BTN;
    this.messageContainer = PWNED_MESSAGE_CONTAINER;
    this.messageEmailContainer = PWNED_EMAIL_RESULT;
    this.pwnedMessage = PWNED_MESSAGE_RESULT;
    this.homeLink = HOME_NAVBAR_LINK;
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
var import_puppeteer_extra = __toESM(require("puppeteer-extra"), 1);
var import_puppeteer_extra_plugin_stealth = __toESM(require("puppeteer-extra-plugin-stealth"), 1);
var import_user_agents = __toESM(require("user-agents"), 1);
var Ihbp = class extends import_node_events.default {
  constructor(options, puppeteerOptions = {}) {
    super();
    this.puppeteerOptions = {
      ...DEFAULT_PUPPETEER_OPTIONS,
      ...puppeteerOptions
    };
    this.options = { ...DEFAULT_CLIENT_OPTIONS, ...options };
    this.pwned = new Pwned();
    this.userAgent = new import_user_agents.default();
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
      this.browser = await import_puppeteer_extra.default.use((0, import_puppeteer_extra_plugin_stealth.default)()).launch(this.puppeteerOptions);
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

// src/types/puppeteer.types.ts
var puppeteer_types_exports = {};

// src/types/client.types.ts
var client_types_exports = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Ihbp,
  Pwned,
  clientTypes,
  common,
  puppeteerTypes,
  selectors,
  utils
});
//# sourceMappingURL=index.cjs.map