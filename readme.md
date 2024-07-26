### THIS LIBRARY IS CURRENT IN BETA AND UNDER DEVELOPMENT

## IHBP - I Have been pwned Client

## About
**A client for a node APP to easily interact with IHAVEBEENPWNED website. Check if your email or 
password has been pwned directly when a user type a password and give instant feedback!**

**This library use puppeteer under the hood so you do not need apiKey nor configuration at all.**


## Example basic configuration

```javascript

import { Ihbp } from "ihbp-client/lib/client/Client.js";

const ihbp = new Ihbp()

ihbp.init()

ihbp.when('client ready', async () => {
    const pw = await ihbp.isPasswordPwned('myPassword')
    console.log(pw.isPasswordPwned) // -> true/false
    console.log(pw)
    
    /* response of pw
    {
        isPasswordPwned: true,
        message: 'This password has been seen 345 times before'
    }
    */

    // at moment, the isEmailPwned method is not supported due to cloudflare turnstile protection
    const email = await ihbp.isEmailPwned('testemail@gmail.com')
})
```
