"use strict";var D=Object.create;var p=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var U=Object.getOwnPropertyNames;var H=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty;var l=(i,e)=>{for(var t in e)p(i,t,{get:e[t],enumerable:!0})},M=(i,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of U(e))!F.call(i,s)&&s!==t&&p(i,s,{get:()=>e[s],enumerable:!(r=k(e,s))||r.enumerable});return i};var m=(i,e,t)=>(t=i!=null?D(H(i)):{},M(e||!i||!i.__esModule?p(t,"default",{value:i,enumerable:!0}):t,i)),W=i=>M(p({},"__esModule",{value:!0}),i);var G={};l(G,{Ihbp:()=>d,Pwned:()=>o,clientTypes:()=>_,common:()=>P,puppeteerTypes:()=>O,selectors:()=>x,utils:()=>R});module.exports=W(G);var P={};l(P,{DEFAULT_CLIENT_OPTIONS:()=>w,DEFAULT_PUPPETEER_OPTIONS:()=>c,HIBP_REFERRER:()=>g,HIBP_URL:()=>u});var u="https://haveibeenpwned.com/",g="https://www.google.com/search?q=ihave+been+pwned&oq=ihave+been+pwned&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTINCAEQLhiDARixAxiABDIHCAIQABiABDINCAMQLhjHARjRAxiABDIHCAQQLhiABDIJCAUQABgKGIAEMgcIBhAAGIAEMgcIBxAAGIAEMgcICBAAGIAE0gEIMzkwOWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8",c={headless:!0,defaultViewport:null,args:["--no-sandbox","--disable-setuid-sandbox"]},w={authTimeoutMs:0,qrMaxRetries:0,takeoverOnConflict:!1,takeoverTimeoutMs:0,ffmpegPath:"ffmpeg",bypassCSP:!0,proxyAuthentication:void 0};var B=m(require("events"),1);var x={};l(x,{EMAIL_BTN:()=>A,EMAIL_INPUT:()=>b,HOME_NAVBAR_LINK:()=>E,PASSWORD_INPUT:()=>f,PASSWORD_NAVBAR_LINK:()=>h,PWNED_BTN:()=>v,PWNED_EMAIL_RESULT:()=>T,PWNED_MESSAGE_CONTAINER:()=>y,PWNED_MESSAGE_RESULT:()=>I});var h='a[href="/Passwords"]',E='a[href="/Home"]',f='input[placeholder="password"]',b='input[placeholder="email address"]',v="#searchPwnedPasswords",A="#searchPwnage",y=".pwnTitle",I="#pwnedPasswordResult",T=".pwnTitle";var R={};l(R,{isElementInDom:()=>C});var C=async(i,e)=>{try{return await i?.evaluate(async r=>new Promise(s=>{if(document.querySelector(r)){s(!0);return}let a=new MutationObserver(()=>{document.querySelector(r)&&(a.disconnect(),s(!0))});a.observe(document,{childList:!0,subtree:!0}),setTimeout(()=>{a.disconnect(),s(!1)},5e3)}),e)||!1}catch{return!1}};var o=class{constructor(){this.navLink=h;this.pwInput=f;this.emailInput=b;this.pwnedBtn=v;this.searchPwnageBtn=A;this.messageContainer=y;this.messageEmailContainer=T;this.pwnedMessage=I;this.homeLink=E}async isEmailPwned(e,t){try{if(await e.type(this.emailInput,t,{delay:120}),await e.click(this.searchPwnageBtn),await this.isConfirmationMessageInDom(e,this.messageContainer))return await this.waitFor(1500,2500),{isEmailPwned:!0,message:await e.$eval(this.messageEmailContainer,n=>n.textContent?.trim()||"")}}catch(r){return{message:"An error occurred",errorMessage:r instanceof Error?r.message:String(r)}}}async isPasswordPwned(e,t){try{if(await e.waitForSelector(this.navLink,{visible:!0,timeout:5e4}),await e.click(this.navLink),await this.waitFor(1e3,2e3),await e.type(this.pwInput,t,{delay:120}),await e.click(this.pwnedBtn),await this.isConfirmationMessageInDom(e,this.messageContainer))return await this.waitFor(1500,2500),{isPasswordPwned:!0,message:await e.$eval(this.pwnedMessage,n=>n.textContent?.trim()||"")}}catch(r){return{message:"An error occurred",errorMessage:r instanceof Error?r.message:String(r)}}}async waitFor(e,t){let r=(s,n)=>Math.floor(Math.random()*(n-s+1))+s;return new Promise(s=>setTimeout(()=>s(),r(e,t)))}async isConfirmationMessageInDom(e,t){try{return await C(e,t)}catch{return!1}}};var N=m(require("puppeteer-extra"),1),L=m(require("puppeteer-extra-plugin-stealth"),1),S=m(require("user-agents"),1);var O={};var _={};var d=class extends B.default{constructor(e,t={}){super(),this.puppeteerOptions={...c,...t},this.options={...w,...e},this.pwned=new o,this.userAgent=new S.default}when(e,t){this.on(e,t)}async init(){await this.initializeBrowser(),await this.configurePageOptions(),await this.navigateToHIBP()}async isPasswordPwned(e){return await this.pwned.isPasswordPwned(this.page,e)}async isEmailPwned(e){return await this.navigateToHIBP(),await this.pwned.isEmailPwned(this.page,e)}async initializeBrowser(){try{this.browser=await N.default.use((0,L.default)()).launch(this.puppeteerOptions);let e=await this.browser.pages();this.page=e.length>0?e[0]:await this.browser.newPage(),this.browser&&this.page&&this.emit("client_ready")}catch(e){throw this.emit("client_crashed"),e}}async configurePageOptions(){this.page&&(await this.page.setViewport({width:Math.floor(Math.random()*555)+1366,height:Math.floor(Math.random()*313)+768,deviceScaleFactor:1,isMobile:!1,hasTouch:!1,isLandscape:!1}),(this.options.userAgent!=null||this.options.userAgent===void 0)&&await this.page.setUserAgent(this.userAgent.random().toString()),this.options.proxyAuthentication&&await this.page.authenticate(this.options.proxyAuthentication),this.options.bypassCSP&&await this.page.setBypassCSP(this.options.bypassCSP),await this.page.evaluateOnNewDocument(()=>{window.Error=Error}))}async navigateToHIBP(){await this.page?.goto(u,{waitUntil:"networkidle0",timeout:0,referer:g})}async waitFor(e,t,r){let s=(n,a)=>Math.floor(Math.random()*(a-n+1))+n;return new Promise(n=>setTimeout(()=>n(),s(t,r)))}onEvent(e,t){return this.on(e,(...r)=>{t(...r)})}};0&&(module.exports={Ihbp,Pwned,clientTypes,common,puppeteerTypes,selectors,utils});
//# sourceMappingURL=index.cjs.map