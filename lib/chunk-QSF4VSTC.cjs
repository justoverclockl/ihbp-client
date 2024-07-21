"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }




var _chunkRUGBXIRXcjs = require('./chunk-RUGBXIRX.cjs');


var _chunkGSML3A2Ccjs = require('./chunk-GSML3A2C.cjs');


var _chunkETV4XYOVcjs = require('./chunk-ETV4XYOV.cjs');

// src/client/Client.ts
var _puppeteer = require('puppeteer'); var _puppeteer2 = _interopRequireDefault(_puppeteer);
var _events = require('events'); var _events2 = _interopRequireDefault(_events);
var Ihbp = class extends _events2.default {
  constructor(options, puppeteerOptions = {}) {
    super();
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "puppeteerOptions");
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "options");
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "page");
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "browser");
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "password");
    this.puppeteerOptions = {
      ..._chunkRUGBXIRXcjs.DEFAULT_PUPPETEER_OPTIONS,
      ...puppeteerOptions
    };
    this.options = { ..._chunkRUGBXIRXcjs.DEFAULT_CLIENT_OPTIONS, ...options };
    this.password = new (0, _chunkGSML3A2Ccjs.Password)();
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
      this.browser = await _puppeteer2.default.launch(this.puppeteerOptions);
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
    await _optionalChain([this, 'access', _ => _.page, 'optionalAccess', _2 => _2.goto, 'call', _3 => _3(_chunkRUGBXIRXcjs.HIBP_URL, {
      waitUntil: "networkidle0",
      timeout: 0,
      referer: _chunkRUGBXIRXcjs.HIBP_REFERRER
    })]);
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



exports.Ihbp = Ihbp;
