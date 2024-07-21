// src/constants/common.ts
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
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
  ffmpegPath: "ffmpeg",
  bypassCSP: false,
  proxyAuthentication: void 0
};

export {
  HIBP_URL,
  HIBP_REFERRER,
  DEFAULT_PUPPETEER_OPTIONS,
  DEFAULT_CLIENT_OPTIONS
};
