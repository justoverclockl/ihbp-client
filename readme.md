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
    const result = await ihbp.isPasswordPwned('myPassword')
    console.log(result.isPasswordPwned) // -> true/false
    console.log(result)
    
    /* response of result
    {
        isPasswordPwned: true,
        message: 'This password has been seen 345 times before'
    }
    */
})
```
