"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkZ7ZV6X7Ycjs = require('./chunk-Z7ZV6X7Y.cjs');










var _chunkGX7PXYBRcjs = require('./chunk-GX7PXYBR.cjs');


var _chunkETV4XYOVcjs = require('./chunk-ETV4XYOV.cjs');

// src/client/pwned.ts
var Pwned = class {
  constructor() {
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "navLink", _chunkGX7PXYBRcjs.PASSWORD_NAVBAR_LINK);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "pwInput", _chunkGX7PXYBRcjs.PASSWORD_INPUT);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "emailInput", _chunkGX7PXYBRcjs.EMAIL_INPUT);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "pwnedBtn", _chunkGX7PXYBRcjs.PWNED_BTN);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "searchPwnageBtn", _chunkGX7PXYBRcjs.EMAIL_BTN);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "messageContainer", _chunkGX7PXYBRcjs.PWNED_MESSAGE_CONTAINER);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "messageEmailContainer", _chunkGX7PXYBRcjs.PWNED_EMAIL_RESULT);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "pwnedMessage", _chunkGX7PXYBRcjs.PWNED_MESSAGE_RESULT);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "homeLink", _chunkGX7PXYBRcjs.HOME_NAVBAR_LINK);
  }
  async isEmailPwned(page, email) {
    try {
      await page.type(this.emailInput, email, { delay: 120 });
      await page.click(this.searchPwnageBtn);
      const isResponseAvailable = await this.isConfirmationMessageInDom(page, this.messageContainer);
      if (isResponseAvailable) {
        await this.waitFor(1500, 2500);
        const messageContent = await page.$eval(this.messageEmailContainer, (el) => _optionalChain([el, 'access', _ => _.textContent, 'optionalAccess', _2 => _2.trim, 'call', _3 => _3()]) || "");
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
      await page.waitForSelector(this.navLink, { visible: true, timeout: 5e4 });
      await page.click(this.navLink);
      await this.waitFor(1e3, 2e3);
      await page.type(this.pwInput, password, { delay: 120 });
      await page.click(this.pwnedBtn);
      const isResponseAvailable = await this.isConfirmationMessageInDom(page, this.messageContainer);
      if (isResponseAvailable) {
        await this.waitFor(1e3, 2e3);
        const messageContent = await page.$eval(this.pwnedMessage, (el) => _optionalChain([el, 'access', _4 => _4.textContent, 'optionalAccess', _5 => _5.trim, 'call', _6 => _6()]) || "");
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
    return new Promise((resolve) => setTimeout(() => resolve(), randomDelay(minDelay, maxDelay)));
  }
  async isConfirmationMessageInDom(page, selector) {
    try {
      return await _chunkZ7ZV6X7Ycjs.isElementInDom.call(void 0, page, selector);
    } catch (error) {
      return false;
    }
  }
};



exports.Pwned = Pwned;
