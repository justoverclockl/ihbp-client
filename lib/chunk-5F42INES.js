import {
  isElementInDom
} from "./chunk-EPQDHLB6.js";
import {
  EMAIL_BTN,
  EMAIL_INPUT,
  HOME_NAVBAR_LINK,
  PASSWORD_INPUT,
  PASSWORD_NAVBAR_LINK,
  PWNED_BTN,
  PWNED_EMAIL_RESULT,
  PWNED_MESSAGE_CONTAINER,
  PWNED_MESSAGE_RESULT
} from "./chunk-KE7BOGFT.js";
import {
  __publicField
} from "./chunk-PKBMQBKP.js";

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
      const isResponseAvailable = await this.isConfirmationMessageInDom(page, this.messageContainer);
      if (isResponseAvailable) {
        await this.waitFor(1500, 2500);
        const messageContent = await page.$eval(this.messageEmailContainer, (el) => el.textContent?.trim() || "");
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
        const messageContent = await page.$eval(this.pwnedMessage, (el) => el.textContent?.trim() || "");
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
      return await isElementInDom(page, selector);
    } catch (error) {
      return false;
    }
  }
};

export {
  Pwned
};
