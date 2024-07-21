// src/utils/elementObserver.ts
var isElementInDom = async (page, elementSelector) => {
  try {
    const isElement = await page?.evaluate(async (selector) => {
      return new Promise((resolve) => {
        const element = document.querySelector(selector);
        if (element) {
          resolve(true);
          return;
        }
        const observer = new MutationObserver(() => {
          const scannedElement = document.querySelector(selector);
          if (scannedElement) {
            observer.disconnect();
            resolve(true);
          }
        });
        observer.observe(document, { childList: true, subtree: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(false);
        }, 5e3);
      });
    }, elementSelector);
    return isElement || false;
  } catch (error) {
    return false;
  }
};

export {
  isElementInDom
};
