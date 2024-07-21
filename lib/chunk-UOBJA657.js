import {
  isElementInDom
} from "./chunk-B6XJLCSP.js";
import {
  PASSWORD_INPUT,
  PASSWORD_NAVBAR_LINK,
  PWNED_BTN,
  PWNED_MESSAGE_CONTAINER,
  PWNED_MESSAGE_RESULT
} from "./chunk-AHPNXMUG.js";
import {
  __publicField
} from "./chunk-PKBMQBKP.js";

// src/password/Password.ts
var Password = class {
  constructor() {
    __publicField(this, "navLink", PASSWORD_NAVBAR_LINK);
    __publicField(this, "pwInput", PASSWORD_INPUT);
    __publicField(this, "pwnedBtn", PWNED_BTN);
    __publicField(this, "messageContainer", PWNED_MESSAGE_CONTAINER);
    __publicField(this, "pwnedMessage", PWNED_MESSAGE_RESULT);
    this.navLink = PASSWORD_NAVBAR_LINK;
    this.pwInput = PASSWORD_INPUT;
    this.pwnedBtn = PWNED_BTN;
    this.messageContainer = PWNED_MESSAGE_CONTAINER;
    this.pwnedMessage = PWNED_MESSAGE_RESULT;
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
  async waitFor(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }
  async isConfirmationMessageInDom(page) {
    try {
      return await isElementInDom(page, this.messageContainer);
    } catch (error) {
      return false;
    }
  }
};

export {
  Password
};
