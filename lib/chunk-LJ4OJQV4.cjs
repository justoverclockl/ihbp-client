"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkZYRXSD4Acjs = require('./chunk-ZYRXSD4A.cjs');





var _chunk5WTN53S3cjs = require('./chunk-5WTN53S3.cjs');


var _chunkETV4XYOVcjs = require('./chunk-ETV4XYOV.cjs');

// src/client/Client.ts
var _events = require('events'); var _events2 = _interopRequireDefault(_events);
var _puppeteerextra = require('puppeteer-extra'); var _puppeteerextra2 = _interopRequireDefault(_puppeteerextra);
var _puppeteerextrapluginstealth = require('puppeteer-extra-plugin-stealth'); var _puppeteerextrapluginstealth2 = _interopRequireDefault(_puppeteerextrapluginstealth);
var _useragents = require('user-agents'); var _useragents2 = _interopRequireDefault(_useragents);
var Ihbp = class extends _events2.default {
  constructor(options, puppeteerOptions = {}) {
    super();
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "puppeteerOptions");
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "options");
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "page");
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "browser");
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "pwned");
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "userAgent");
    this.puppeteerOptions = {
      ..._chunk5WTN53S3cjs.DEFAULT_PUPPETEER_OPTIONS,
      ...puppeteerOptions
    };
    this.options = { ..._chunk5WTN53S3cjs.DEFAULT_CLIENT_OPTIONS, ...options };
    this.pwned = new (0, _chunkZYRXSD4Acjs.Pwned)();
    this.userAgent = new (0, _useragents2.default)();
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
      this.browser = await _puppeteerextra2.default.use(_puppeteerextrapluginstealth2.default.call(void 0, )).launch(this.puppeteerOptions);
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
    await _optionalChain([this, 'access', _ => _.page, 'optionalAccess', _2 => _2.goto, 'call', _3 => _3(_chunk5WTN53S3cjs.HIBP_URL, {
      waitUntil: "networkidle0",
      timeout: 0,
      referer: _chunk5WTN53S3cjs.HIBP_REFERRER
    })]);
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



exports.Ihbp = Ihbp;
