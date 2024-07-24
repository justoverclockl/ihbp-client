"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/utils/elementObserver.ts
var isElementInDom = async (page, elementSelector) => {
  try {
    const isElement = await _optionalChain([page, 'optionalAccess', _ => _.evaluate, 'call', _2 => _2(
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
    )]);
    return isElement || false;
  } catch (error) {
    return false;
  }
};



exports.isElementInDom = isElementInDom;
