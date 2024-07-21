"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkT6OIEQM6cjs = require('./chunk-T6OIEQM6.cjs');






var _chunkM2H67WW7cjs = require('./chunk-M2H67WW7.cjs');


var _chunkETV4XYOVcjs = require('./chunk-ETV4XYOV.cjs');

// src/password/Password.ts
var Password = class {
  constructor() {
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "navLink", _chunkM2H67WW7cjs.PASSWORD_NAVBAR_LINK);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "pwInput", _chunkM2H67WW7cjs.PASSWORD_INPUT);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "pwnedBtn", _chunkM2H67WW7cjs.PWNED_BTN);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "messageContainer", _chunkM2H67WW7cjs.PWNED_MESSAGE_CONTAINER);
    _chunkETV4XYOVcjs.__publicField.call(void 0, this, "pwnedMessage", _chunkM2H67WW7cjs.PWNED_MESSAGE_RESULT);
    this.navLink = _chunkM2H67WW7cjs.PASSWORD_NAVBAR_LINK;
    this.pwInput = _chunkM2H67WW7cjs.PASSWORD_INPUT;
    this.pwnedBtn = _chunkM2H67WW7cjs.PWNED_BTN;
    this.messageContainer = _chunkM2H67WW7cjs.PWNED_MESSAGE_CONTAINER;
    this.pwnedMessage = _chunkM2H67WW7cjs.PWNED_MESSAGE_RESULT;
  }
  async isPasswordPwned(page, password) {
    try {
      await page.waitForSelector(this.navLink, {
        visible: true,
        timeout: 5e4
      });
      await page.click(this.navLink);
      await this.waitFor(1e3);
      await page.type(this.pwInput, password, { delay: 120 });
      await page.click(this.pwnedBtn);
      const isResponseAvailable = await this.isConfirmationMessageInDom(page);
      if (isResponseAvailable) {
        await this.waitFor(1500);
        const messageContent = await page.$eval(
          this.pwnedMessage,
          (el) => _optionalChain([el, 'access', _ => _.textContent, 'optionalAccess', _2 => _2.trim, 'call', _3 => _3()]) || ""
        );
        return {
          isPasswordPwned: true,
          message: messageContent
        };
      }
    } catch (error) {
      console.error("Error in isPasswordPwned:", error);
      return {
        message: "An error occurred"
      };
    }
  }
  async waitFor(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }
  async isConfirmationMessageInDom(page) {
    try {
      return await _chunkT6OIEQM6cjs.isElementInDom.call(void 0, page, this.messageContainer);
    } catch (error) {
      return false;
    }
  }
};



exports.Password = Password;
