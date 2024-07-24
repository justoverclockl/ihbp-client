"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/constants/common.ts
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






exports.HIBP_URL = HIBP_URL; exports.HIBP_REFERRER = HIBP_REFERRER; exports.DEFAULT_PUPPETEER_OPTIONS = DEFAULT_PUPPETEER_OPTIONS; exports.DEFAULT_CLIENT_OPTIONS = DEFAULT_CLIENT_OPTIONS;
