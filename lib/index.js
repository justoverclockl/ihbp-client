var C=Object.defineProperty;var p=(n,e)=>{for(var t in e)C(n,t,{get:e[t],enumerable:!0})};var I={};p(I,{DEFAULT_CLIENT_OPTIONS:()=>u,DEFAULT_PUPPETEER_OPTIONS:()=>d,HIBP_REFERRER:()=>m,HIBP_URL:()=>l});var l="https://haveibeenpwned.com/",m="https://www.google.com/search?q=ihave+been+pwned&oq=ihave+been+pwned&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTINCAEQLhiDARixAxiABDIHCAIQABiABDINCAMQLhjHARjRAxiABDIHCAQQLhiABDIJCAUQABgKGIAEMgcIBhAAGIAEMgcIBxAAGIAEMgcICBAAGIAE0gEIMzkwOWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8",d={headless:!0,defaultViewport:null,args:["--no-sandbox","--disable-setuid-sandbox"]},u={authTimeoutMs:0,qrMaxRetries:0,takeoverOnConflict:!1,takeoverTimeoutMs:0,ffmpegPath:"ffmpeg",bypassCSP:!0,proxyAuthentication:void 0};import O from"events";var T={};p(T,{EMAIL_BTN:()=>E,EMAIL_INPUT:()=>P,HOME_NAVBAR_LINK:()=>c,PASSWORD_INPUT:()=>w,PASSWORD_NAVBAR_LINK:()=>g,PWNED_BTN:()=>h,PWNED_EMAIL_RESULT:()=>v,PWNED_MESSAGE_CONTAINER:()=>f,PWNED_MESSAGE_RESULT:()=>b});var g='a[href="/Passwords"]',c='a[href="/Home"]',w='input[placeholder="password"]',P='input[placeholder="email address"]',h="#searchPwnedPasswords",E="#searchPwnage",f=".pwnTitle",b="#pwnedPasswordResult",v=".pwnTitle";var x={};p(x,{isElementInDom:()=>A});var A=async(n,e)=>{try{return await n?.evaluate(async r=>new Promise(i=>{if(document.querySelector(r)){i(!0);return}let o=new MutationObserver(()=>{document.querySelector(r)&&(o.disconnect(),i(!0))});o.observe(document,{childList:!0,subtree:!0}),setTimeout(()=>{o.disconnect(),i(!1)},5e3)}),e)||!1}catch{return!1}};var a=class{constructor(){this.navLink=g;this.pwInput=w;this.emailInput=P;this.pwnedBtn=h;this.searchPwnageBtn=E;this.messageContainer=f;this.messageEmailContainer=v;this.pwnedMessage=b;this.homeLink=c}async isEmailPwned(e,t){try{if(await e.type(this.emailInput,t,{delay:120}),await e.click(this.searchPwnageBtn),await this.isConfirmationMessageInDom(e,this.messageContainer))return await this.waitFor(1500,2500),{isEmailPwned:!0,message:await e.$eval(this.messageEmailContainer,s=>s.textContent?.trim()||"")}}catch(r){return{message:"An error occurred",errorMessage:r instanceof Error?r.message:String(r)}}}async isPasswordPwned(e,t){try{if(await e.waitForSelector(this.navLink,{visible:!0,timeout:5e4}),await e.click(this.navLink),await this.waitFor(1e3,2e3),await e.type(this.pwInput,t,{delay:120}),await e.click(this.pwnedBtn),await this.isConfirmationMessageInDom(e,this.messageContainer))return await this.waitFor(1500,2500),{isPasswordPwned:!0,message:await e.$eval(this.pwnedMessage,s=>s.textContent?.trim()||"")}}catch(r){return{message:"An error occurred",errorMessage:r instanceof Error?r.message:String(r)}}}async waitFor(e,t){let r=(i,s)=>Math.floor(Math.random()*(s-i+1))+i;return new Promise(i=>setTimeout(()=>i(),r(e,t)))}async isConfirmationMessageInDom(e,t){try{return await A(e,t)}catch{return!1}}};import _ from"puppeteer-extra";import B from"puppeteer-extra-plugin-stealth";import N from"user-agents";var R={};var M={};var y=class extends O{constructor(e,t={}){super(),this.puppeteerOptions={...d,...t},this.options={...u,...e},this.pwned=new a,this.userAgent=new N}when(e,t){this.on(e,t)}async init(){await this.initializeBrowser(),await this.configurePageOptions(),await this.navigateToHIBP()}async isPasswordPwned(e){return await this.pwned.isPasswordPwned(this.page,e)}async isEmailPwned(e){return await this.navigateToHIBP(),await this.pwned.isEmailPwned(this.page,e)}async initializeBrowser(){try{this.browser=await _.use(B()).launch(this.puppeteerOptions);let e=await this.browser.pages();this.page=e.length>0?e[0]:await this.browser.newPage(),this.browser&&this.page&&this.emit("client_ready")}catch(e){throw this.emit("client_crashed"),e}}async configurePageOptions(){this.page&&(await this.page.setViewport({width:Math.floor(Math.random()*555)+1366,height:Math.floor(Math.random()*313)+768,deviceScaleFactor:1,isMobile:!1,hasTouch:!1,isLandscape:!1}),(this.options.userAgent!=null||this.options.userAgent===void 0)&&await this.page.setUserAgent(this.userAgent.random().toString()),this.options.proxyAuthentication&&await this.page.authenticate(this.options.proxyAuthentication),this.options.bypassCSP&&await this.page.setBypassCSP(this.options.bypassCSP),await this.page.evaluateOnNewDocument(()=>{window.Error=Error}))}async navigateToHIBP(){await this.page?.goto(l,{waitUntil:"networkidle0",timeout:0,referer:m})}async waitFor(e,t,r){let i=(s,o)=>Math.floor(Math.random()*(o-s+1))+s;return new Promise(s=>setTimeout(()=>s(),i(t,r)))}onEvent(e,t){return this.on(e,(...r)=>{t(...r)})}};export{y as Ihbp,a as Pwned,M as clientTypes,I as common,R as puppeteerTypes,T as selectors,x as utils};
//# sourceMappingURL=index.js.map